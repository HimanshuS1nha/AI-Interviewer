import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["login", "signup", "verify", "forgot-password"];
const protectedRoutes = ["dashboard", "interview"];

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname.split("/")[1];

  if (authRoutes.includes(pathname)) {
    const token = (await cookies()).get("token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/dashboard/interviews", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (protectedRoutes.includes(pathname)) {
    if (pathname === "dashboard") {
      const token = (await cookies()).get("token")?.value;
      if (token) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      const interviewToken = (await cookies()).get("interview-token")?.value;
      if (!interviewToken) {
        if (req.nextUrl.pathname.split("/").length < 4) {
          return NextResponse.next();
        }
        const interviewId = req.nextUrl.pathname.split("/")[2];
        if (req.nextUrl.pathname.split("/")[3] === "login") {
          return NextResponse.next();
        }
        return NextResponse.redirect(
          new URL(`/interview/${interviewId}/login`, req.url)
        );
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interview/:path*",
    "/login",
    "/signup",
    "/verify",
    "/forgot-password/:path*",
  ],
};
