import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";

import { getCandidate } from "@/helpers/get-candidate";

export const GET = async (
  _: NextRequest,
  {
    params,
  }: { params: Promise<{ questionNumber: string; interviewId: string }> }
) => {
  try {
    const { interviewId, questionNumber } = await params;

    const interviewToken = (await cookies()).get("interview-token")?.value;
    if (!interviewToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      interviewToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string } };

    const candidate = await getCandidate(payload.email, interviewId);
    if (!candidate) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (candidate.isInterviewGiven) {
      return NextResponse.json(
        { error: "You have already given the interview" },
        { status: 401 }
      );
    }

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
      (await cookies()).delete("interview-token");
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
        (await cookies()).delete("interview-token");
        return NextResponse.json(
          { error: "Interview has not started yet" },
          { status: 403 }
        );
      }
    }

    const question = await prisma.questions.findFirst({
      where: {
        interviewId,
        questionNumber: parseInt(questionNumber),
      },
      include: {
        CandidatesAnswers: {
          where: {
            id: candidate.id,
          },
        },
      },
    });
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    if (question?.CandidatesAnswers.length > 0) {
      return NextResponse.json(
        {
          error: "You have already answered this question",
        },
        { status: 409 }
      );
    }

    for (let i = 1; i < parseInt(questionNumber); i++) {
      const question = await prisma.questions.findFirst({
        where: {
          interviewId,
          questionNumber: i,
        },
        include: {
          CandidatesAnswers: {
            where: {
              id: candidate.id,
            },
          },
        },
      });

      if (question?.CandidatesAnswers.length === 0) {
        return NextResponse.json(
          {
            error: "Please attempt the previous question first",
            questionNumber: i,
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json({
      question: { id: question.id, question: question.question },
    });
  } catch {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
