import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { hash } from "bcrypt";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { createAndSendOtp } from "@/helpers/create-and-send-otp";

import { signupValidator } from "@/validators/signup-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email, password, name, confirmPassword } =
      await signupValidator.parseAsync(data);
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 422 }
      );
    }

    const user = await getUserByEmail(email);
    if (user) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await createAndSendOtp(email);

    return NextResponse.json(
      { message: "Account created successfully. Verify your email" },
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
