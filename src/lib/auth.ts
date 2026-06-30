import NextAuth from "next-auth"
import connectDB from "./mongodb"
import { denv } from "@/utils/env"
import User from "./model/user.model"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { Auth } from "@/types/next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const user = credentials as Auth 

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },

    })
  ],

  callbacks: {
    signIn: async ({ user, account }) => {

      if (account?.provider === "google") {
        await connectDB()
        let googleUser = await User.findOne({ email: user.email })
        if (!googleUser)
          googleUser = await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            verified: true,
          })
        user.id = googleUser._id.toString()
        user.role = googleUser.role
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
