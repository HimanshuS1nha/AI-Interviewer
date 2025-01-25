import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const DELETE = async (
  _: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> }
) => {
  try {
    const { interviewId } = await params;

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

    const interview = await prisma.interviews.findUnique({
      where: {
        id: interviewId,
        userEmail: user.email,
      },
    });
    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    await prisma.interviews.delete({
      where: {
        id: interview.id,
      },
    });

    return NextResponse.json(
      { message: "Interview deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
