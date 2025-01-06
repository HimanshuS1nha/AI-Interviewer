import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ interviewId: string; candidateId: string }> }
) => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string } };
    if (!payload.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { interviewId, candidateId } = await params;

    const interview = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
        userEmail: user.email,
      },
      include: {
        Questions: true,
      },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    const answers: {
      id: string;
      question: string;
      feedback: string;
      answer: string;
      rating: number;
    }[] = [];

    for (const question of interview.Questions) {
      const answer = await prisma.candidatesAnswers.findFirst({
        where: {
          questionId: question.id,
          candidateId,
        },
      });

      answers.push({
        id: question.id,
        answer: answer?.answer ?? "",
        feedback: answer?.feedback ?? "",
        question: question.question,
        rating: answer?.rating ?? 0,
      });
    }

    return NextResponse.json({ answers }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Some error occured. Please try again later!",
      },
      { status: 500 }
    );
  }
};
