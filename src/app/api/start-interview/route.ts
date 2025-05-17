import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

import { startInterviewValidator } from "@/validators/start-interview-validator";

export const POST = async (req: NextRequest) => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string } };

    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { interviewId } = await startInterviewValidator.parseAsync(data);

    const interview = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
        userEmail: user.email,
      },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }
    if (interview.status !== "NOT_STARTED") {
      return NextResponse.json(
        {
          error:
            interview.status === "COMPLETE"
              ? "Interview has already completed"
              : "Interview is currently ongoing",
        },
        { status: 409 }
      );
    }

    await prisma.interviews.update({
      where: {
        id: interview.id,
      },
      data: {
        status: "ONGOING",
        startedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Interview started successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 422 }
      );
    } else {
      return NextResponse.json({
        error: "Some error occured. Please try again later!",
      });
    }
  }
};
