import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { createAndSendOtp } from "@/helpers/create-and-send-otp";

import { loginValidator } from "@/validators/login-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email, password } = await loginValidator.parseAsync(data);

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const doesPasswordMatch = await compare(password, user.password);
    if (!doesPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.isEmailVerified) {
      await createAndSendOtp(email);

      return NextResponse.json(
        { error: "Email not verified" },
        { status: 403 }
      );
    }

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 10,
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        user: { email: user.email, name: user.name, id: user.id },
        message: "Logged in successfully",
      },
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
