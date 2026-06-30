import "next-auth"
import "next-auth/jwt"

export type Auth = {
    name: string,
    email: string,
    role: string
    id: string,
}

declare module "next-auth" {
  interface User {
    name: string,
    email: string,
    role: string
    id: string,
  }
  interface Session {
    user: {
      name: string,
      email: string,
      role: string,
      id: string,
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string,
    email: string,
    role: string,
    id: string,
  }
}

