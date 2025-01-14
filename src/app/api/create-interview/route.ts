import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { generate } from "otp-generator";
import { hash } from "bcrypt";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { generateQuestions } from "@/helpers/generate-questions";

import { createInterviewValidator } from "@/validators/create-interview-validator";

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
    if (user.remainingNumberOfInterviews <= 0) {
      return NextResponse.json(
        { error: "Upgrade your plan to continue" },
        { status: 403 }
      );
    }

    const data = await req.json();
    const {
      candidatesEmails,
      experience,
      jobDescription,
      jobTitle,
      techStack,
      time,
    } = await createInterviewValidator.parseAsync(data);

    if (
      (user.plan === "BASIC" && candidatesEmails.length > 15) ||
      (user.plan === "PRO" && candidatesEmails.length > 30)
    ) {
      return NextResponse.json(
        { error: "Upgrade your plan to continue" },
        { status: 403 }
      );
    }

    const interview = await prisma.interviews.create({
      data: {
        experience: parseInt(experience),
        jobDescription,
        jobTitle,
        techStack,
        time: parseInt(time),
        userEmail: user.email,
      },
    });

    for (const candidateEmail of candidatesEmails) {
      const password = generate(10);
      const hashedPassword = await hash(password, 10);
      await prisma.candidates.create({
        data: {
          password: hashedPassword,
          email: candidateEmail,
          interviewId: interview.id,
        },
      });
    }

    const questions = await generateQuestions(
      jobTitle,
      jobDescription,
      techStack,
      parseInt(experience)
    );

    for (const question of questions) {
      await prisma.questions.create({
        data: {
          interviewId: interview.id,
          question,
        },
      });
    }

    await prisma.users.update({
      where: {
        email: user.email,
      },
      data: {
        remainingNumberOfInterviews: user.remainingNumberOfInterviews - 1,
      },
    });

    return NextResponse.json(
      { message: "Interview created successfully" },
      { status: 201 }
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
