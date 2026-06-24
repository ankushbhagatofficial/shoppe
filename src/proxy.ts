import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./lib/auth";

const publicRoutes = {
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
  admin: []
}

const privateRoutes = [
  {
    url: ["/seller/onboarding", "/dashboard/seller"],
    dest: "/seller/login"
  },

  {
    url: ["/dashboard/admin"],
    dest: "/admin/login"
  },

]

type Route = {
  url: string[],
  dest: string
}

type Role = keyof typeof publicRoutes

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const data = session?.user
  const role = data?.role

  let routes = session ? publicRoutes[role as Role] : privateRoutes

  const route = routes.find((route: Route) => (route.url.some((path) => pathname.startsWith(path))))
  if (route?.dest)
    return NextResponse.redirect(new URL(route.dest, request.url))

  return NextResponse.next()

}

export const config = {
  matcher: [
    "/login", "/register", "/seller/login", "/seller/register",
    "/seller/onboarding", "/dashboard", "/dashboard/seller", "/dashboard/admin",
    "/((?!api|_next/static|_next/image|favicon.ico).*)" // skip routes
  ]
}

