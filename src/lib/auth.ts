import NextAuth from "next-auth"
import connectDB from "./mongodb"
import { denv } from "@/utils/env"
import User from "./model/user.model"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const user = credentials as {
          id: string,
          name: string,
          email: string,
          status: string,
          role: string,
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status,
          role: user.role
        }
      },

    })
  ],

  callbacks: {
    signIn: async ({ user, account }) => {
      await connectDB()

      if (account?.provider === "google") {
        await User.findOneAndUpdate({ email: user.email },
          {
            name: user.name,
            email: user.email,
            avatar: user.image,
          },
          {
            upsert: true,
            new: true
          }
        )
      }
      return true
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }

      return token
    },

    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }

      return session
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * denv.auth.session.maxAge,
    updateAge: 60 * 60 * 24 * denv.auth.session.updateAge,
  },
  pages: {
    signIn: "/login"
  },

  secret: process.env.AUTH_SECRET

})
