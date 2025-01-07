import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { ZodError } from "zod";
import { compare } from "bcrypt";

import prisma from "@/lib/db";

import { getCandidate } from "@/helpers/get-candidate";

import { interviewLoginValidatorServer } from "@/validators/interview-login-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email, interviewId, password } =
      await interviewLoginValidatorServer.parseAsync(data);

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
          { status: 422 }
        );
      } else {
        return NextResponse.json(
          { error: "Interview has not started yet" },
          { status: 422 }
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

    const doesPasswordMatch = await compare(password, candidate.password);
    if (!doesPasswordMatch) {
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
      { message: "Logged in successfully" },
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
