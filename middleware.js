import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the request is for an admin page
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip the login page from protection
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin authentication
    const isAdmin = request.cookies.get("isAdmin");

    if (!isAdmin) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
