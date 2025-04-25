import { NextResponse } from "next/server";

// middleware.js
export function middleware(request) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, ""); // Remove trailing slash

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
