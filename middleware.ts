import Negotiator from "next";
import { NextRequest, NextResponse } from "next/server";

const Middleware = (req: NextRequest) => {
  let cookies = req.cookies.get("access_token");

  if (!cookies) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
};

export const config = {
  matcher: ["/dashboard/:path*", "/freelancer/:path*"],
};

export default Middleware;
