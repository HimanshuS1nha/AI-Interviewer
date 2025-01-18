import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getCandidate } from "@/helpers/get-candidate";

import { submitAnswerValidator } from "@/validators/submit-answer-validator";
import { getFeedback } from "@/helpers/get-feedback";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { answer, interviewId, questionId, questionNumber } =
      await submitAnswerValidator.parseAsync(data);

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
        questionNumber,
        id: questionId,
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

    for (let i = 1; i < questionNumber; i++) {
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

    const aiFeedback = await getFeedback(
      question.question,
      answer,
      interview.jobTitle,
      interview.jobDescription,
      interview.techStack,
      interview.experience
    );

    await prisma.candidatesAnswers.create({
      data: {
        answer,
        candidateId: candidate.id,
        questionId,
        feedback: aiFeedback.feedback,
        rating: aiFeedback.rating,
      },
    });

    if (questionNumber === 5) {
      await prisma.candidates.update({
        where: {
          id: candidate.id,
        },
        data: {
          isInterviewGiven: true,
        },
      });

      (await cookies()).delete("interview-token");

      return NextResponse.json({
        message: "Answer submitted successfully",
        isInterviewComplete: true,
      });
    }

    return NextResponse.json({
      message: "Answer submitted successfully",
      isInterviewComplete: false,
    });
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
