import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> }
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

    const { interviewId } = await params;

    const interview = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
        userEmail: user.email,
      },
      include: {
        Questions: {
          include: {
            CandidatesAnswers: true,
          },
        },
        Candidates: true,
      },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    const results = interview.Candidates.map((candidate) => {
      let totalRating = 0;
      interview.Questions.map((question) => {
        const answer = question.CandidatesAnswers.find(
          (answer) => answer.candidateId === candidate.id
        );
        totalRating += answer?.rating ?? 0;
      });

      return {
        id: candidate.id,
        email: candidate.email,
        rating: parseInt((totalRating / interview.Questions.length).toFixed(1)),
      };
    });

    return NextResponse.json({ results }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Some error occured. Please try again later!",
      },
      { status: 500 }
    );
  }
};
