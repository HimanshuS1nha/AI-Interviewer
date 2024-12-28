import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const GET = async () => {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: { email: string} };

    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          email: user.email,
          name: user.name,
          id: user.id,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Some error occured. Please try again later!" },
      { status: 500 }
    );
  }
};
