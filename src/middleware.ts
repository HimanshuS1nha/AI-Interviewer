import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  console.log("Yeah");
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/interview/:path*"],
};
