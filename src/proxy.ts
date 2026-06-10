import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLogged = await auth()
  if (isLogged && ["/login", "/register"].some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()

}

export const config = {
  matcher: [
    "/login/:path*", "/register/:path*", // run for routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)" // skip routes
  ]
}


