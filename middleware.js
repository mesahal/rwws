import { NextResponse } from "next/server";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, ""); // Remove trailing slash

  // 1. First handle admin routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. Then handle news ID-to-slug redirects
  const idPattern = /^\/news\/(\d+)$/;
  const match = pathname.match(idPattern);

  if (match) {
    const id = match[1];
    try {
      // Fetch news item from your API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600", // Cache for 1 hour
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Generate slug from title
        const slug = data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        return NextResponse.redirect(new URL(`/news/${slug}`, request.url));
      }

      // If news item not found, show 404
      return NextResponse.rewrite(new URL("/404", request.url));
    } catch (error) {
      console.error("Middleware redirect error:", error);
      return NextResponse.next();
    }
  }

  // Add this after the news redirect logic
  const programIdPattern = /^\/programs\/(\d+)$/;
  const programMatch = pathname.match(programIdPattern);

  if (programMatch) {
    const id = programMatch[1];
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/program/${id}`,
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const slug = data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        return NextResponse.redirect(new URL(`/programs/${slug}`, request.url));
      }

      return NextResponse.rewrite(new URL("/404", request.url));
    } catch (error) {
      console.error("Program redirect error:", error);
      return NextResponse.next();
    }
  }

  // Add after program redirects
  const storyIdPattern = /^\/impact-stories\/(\d+)$/;
  const storyMatch = pathname.match(storyIdPattern);

  if (storyMatch) {
    const id = storyMatch[1];
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/story/${id}`,
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const slug = data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        return NextResponse.redirect(
          new URL(`/impact-stories/${slug}`, request.url)
        );
      }

      return NextResponse.rewrite(new URL("/404", request.url));
    } catch (error) {
      console.error("Story redirect error:", error);
      return NextResponse.next();
    }
  }

  // Add to existing middleware
  const contentRedirects = [
    { pattern: /^\/news\/(\d+)$/, path: "news" },
    { pattern: /^\/programs\/(\d+)$/, path: "program" },
    { pattern: /^\/impact-stories\/(\d+)$/, path: "story" },
  ];

  for (const { pattern, path } of contentRedirects) {
    const match = pathname.match(pattern);
    if (match) {
      const id = match[1];
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`,
          { headers: { "Cache-Control": "public, s-maxage=3600" } }
        );

        if (response.ok) {
          const data = await response.json();
          const slug = data.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

          return NextResponse.redirect(
            new URL(`/${path}/${slug}`, request.url)
          );
        }

        return NextResponse.rewrite(new URL("/404", request.url));
      } catch (error) {
        console.error(`${path} redirect error:`, error);
        return NextResponse.next();
      }
    }
  }
  return NextResponse.next();
}
