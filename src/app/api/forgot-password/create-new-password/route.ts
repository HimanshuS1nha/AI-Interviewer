import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { hash } from "bcrypt";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

import { createNewPasswordValidator } from "@/validators/create-new-password-validator";

export const POST = async (req: NextRequest) => {
  try {
    const token = (await cookies()).get("password-change-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const { email, isPasswordChangeAllowed } = payload as {
      email: string;
      isPasswordChangeAllowed: boolean;
    };
    if (!isPasswordChangeAllowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { newPassword, confirmPassword } =
      await createNewPasswordValidator.parseAsync(data);
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 422 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await hash(newPassword, 10);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    (await cookies()).delete("password-change-token");

    return NextResponse.json(
      { message: "Password changed successfully" },
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
