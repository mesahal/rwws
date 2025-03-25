import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the request is for an admin page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip the login page from protection
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
