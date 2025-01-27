import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getCandidate } from "@/helpers/get-candidate";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> }
) => {
  try {
    const { interviewId } = await params;

    const interviewToken = (await cookies()).get("interview-token")?.value;
    if (!interviewToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      interviewToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string } };

    const candidate = await getCandidate(payload.email, interviewId);
    if (!candidate) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ email: candidate.email }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
