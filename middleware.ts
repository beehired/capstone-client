import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const Middleware = (req: NextRequest) => {
  // Extract the cookie
  let cookies: any = req.cookies.get("access_token")?.value;

  if (!cookies) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const roleAccess: Record<string, string> = {
    admin: "/dashboard/admin/",
    recruiter: "/dashboard/employer",
    freelance: "/freelancer/",
  };

  try {
    const { role } = jwtDecode<{ role: string }>(cookies);
    const userRole = `${role}`;

    const allowedPath = roleAccess[userRole];
    if (!allowedPath || !req.nextUrl.pathname.startsWith(allowedPath)) {
      return NextResponse.redirect(new URL("/account/onboarding", req.url));
    }
  } catch (err) {
    console.error("JWT decoding failed:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
};

export const config = {
  matcher: ["/dashboard/:path*", "/freelancer/:path*"],
};

export default Middleware;
