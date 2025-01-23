import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

import prisma from "@/lib/db";

import { getUserByEmail } from "@/helpers/get-user-by-email";

export const POST = async (req: NextRequest) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const body = await req.text();
    const order = await razorpay.orders.fetch(body.split("&")[1].split("=")[1]);
    if (order.status === "paid") {
      const token = (await cookies()).get("token")?.value;
      if (!token) {
        return NextResponse.redirect(new URL("/payment-failure", req.url));
      }

      const { payload } = (await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )) as { payload: { email: string } };

      await prisma.paymentDetails.update({
        where: {
          orderId: body.split("&")[1].split("=")[1],
        },
        data: {
          status: "PAID",
        },
      });

      const user = await getUserByEmail(payload.email);

      if (!user) {
        return NextResponse.redirect(new URL("/payment-failure", req.url));
      }

      await prisma.users.update({
        where: {
          email: user.email,
        },
        data: {
          remainingNumberOfInterviews: user.remainingNumberOfInterviews + 10,
          plan: "PRO",
        },
      });

      return NextResponse.redirect(new URL("/payment-success", req.url));
    } else {
      return NextResponse.redirect(new URL("/payment-failure", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/payment-failure", req.url));
  }
};
