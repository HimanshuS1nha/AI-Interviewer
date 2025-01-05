import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ userType: "user" | "company" }> }
) => {
  try {
    const { userType } = await params;
    if (userType !== "user" && userType !== "company") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string; role: "user" | "company" } };
    if (!payload.email || payload.role !== userType) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const interviews = await prisma.interviews.findMany({
      where: {
        userEmail: user.email,
      },
    });

    return NextResponse.json({ interviews }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
