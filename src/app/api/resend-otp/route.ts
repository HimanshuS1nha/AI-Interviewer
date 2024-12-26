import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getUserByEmail } from "@/helpers/get-user-by-email";
import { createAndSendOtp } from "@/helpers/create-and-send-otp";

import { emailValidator } from "@/validators/email-validator";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { email } = await emailValidator.parseAsync(data);

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await createAndSendOtp(email);

    return NextResponse.json(
      { message: "OTP resent successfully" },
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
