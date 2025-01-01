import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { verifyOtp } from "@/helpers/verify-otp";

import { verifyValidator } from "@/validators/verify-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email, otp } = await verifyValidator.parseAsync(data);

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { error: "Verify your email first" },
        { status: 403 }
      );
    }

    const isOtpVerified = await verifyOtp(email, otp);
    if (!isOtpVerified) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 422 });
    }

    const token = await new SignJWT({
      email: user.email,
      isPasswordChangeAllowed: true,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    (await cookies()).set("password-change-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 10,
      sameSite: "strict",
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
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
