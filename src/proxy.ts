import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const routes = {
  user: [
    {
      url: ["/login", "/register"],
      dest: "/"
    },
  ],
  seller: [
    {
      url: ["/seller/login", "/seller/register"],
      dest: "/dashboard/seller"
    }
  ],
  admin: [

  ]
}

type Route = {
  url: string[],
  dest: string
}

type Role = keyof typeof routes

// type Role = "user" | "seller" | "admin"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const data = session?.user
  const role = data?.role

  if (role) {

    const route = routes[role as Role].find((route: Route) => (session && route.url.some((path) => pathname.startsWith(path))))
    if (route?.dest)
      return NextResponse.redirect(new URL(route.dest, request.url))

  }

  return NextResponse.next()

}

export const config = {
  matcher: [
    "/login", "/register", "/seller/login", "/seller/register",
    "/((?!api|_next/static|_next/image|favicon.ico).*)" // skip routes
  ]
}

