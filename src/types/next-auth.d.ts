import "next-auth"
import "next-auth/jwt"

interface Auth {
    name: string,
    email: string,
    role: string
    id: string,
}

declare module "next-auth" {
  interface User extends Auth {}
  interface Session {
    user: Auth
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Auth {}
}

