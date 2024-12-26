import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { verifyOtp } from "@/helpers/verify-otp";

import { verifyValidator } from "@/validators/verify-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email, otp } = await verifyValidator.parseAsync(data);

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "USer not found" }, { status: 404 });
    }

    const isOtpVerified = await verifyOtp(email, otp);
    if (!isOtpVerified) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 422 });
    }

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        isEmailVerified: true,
      },
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
