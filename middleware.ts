import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const theme = request.cookies.get("theme")?.value;

  if (!theme) {
    const prefersDark =
      request.headers.get("sec-ch-prefers-color-scheme") === "dark";
    response.cookies.set("theme", prefersDark ? "dark" : "light");
  }

  return response;
}
