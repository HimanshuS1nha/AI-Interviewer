import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/db";

import { getCandidate } from "@/helpers/get-candidate";

import { interviewLoginValidator } from "@/validators/interview-login-validator";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> }
) => {
  try {
    const { interviewId } = await params;

    const data = await req.json();
    const { email, otp } = await interviewLoginValidator.parseAsync(data);

    const interview = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
      },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }
    if (interview.status !== "ONGOING") {
      if (interview.status === "COMPLETE") {
        return NextResponse.json(
          { error: "Interview has already completed" },
          { status: 403 }
        );
      } else {
        return NextResponse.json(
          { error: "Interview has not started yet" },
          { status: 403 }
        );
      }
    } else if (interview.status === "ONGOING") {
      if (!interview.startedAt) {
        return NextResponse.json(
          { error: "Interview has not started yet" },
          { status: 403 }
        );
      }
      const interviewEndTime = new Date(interview.startedAt);
      interviewEndTime.setHours(interviewEndTime.getHours() + interview.time);

      if (new Date() >= interviewEndTime) {
        await prisma.interviews.update({
          where: {
            id: interview.id,
          },
          data: {
            status: "COMPLETE",
          },
        });
        return NextResponse.json(
          { error: "Interview has already completed" },
          { status: 403 }
        );
      }
    }

    const candidate = await getCandidate(email, interviewId);
    if (!candidate) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    if (candidate.isInterviewGiven) {
      return NextResponse.json(
        { error: "You have already given this interview" },
        { status: 409 }
      );
    }

    const otpEntry = await prisma.candidateLoginOtp.findUnique({
      where: {
        candidateId: candidate.id,
      },
    });
    if (!otpEntry) {
      return NextResponse.json({ error: "OTP not found" }, { status: 404 });
    }
    if (otpEntry.otp !== parseInt(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }
    if (otpEntry.expires < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 401 });
    }

    await prisma.candidateLoginOtp.deleteMany({
      where: {
        candidateId: candidate.id,
      },
    });

    const token = await new SignJWT({ email: candidate.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    (await cookies()).set("interview-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      { message: "Logged in successfully", email },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 422 }
      );
    } else {
      return NextResponse.json(
        { error: "Some error occured. Please try again later!" },
        { status: 500 }
      );
    }
  }
};
