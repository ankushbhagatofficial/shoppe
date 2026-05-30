"use server"

import { z } from "zod"
import connectDB from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import User from "@/lib/model/user.model"
import { redirect } from "next/navigation"

const schema = z.object({
  email: z.email(),
  password: z.string()
})

export async function loginAction(formData: { email: string, password: string, }): Promise<{ success: boolean }> {
  await connectDB()

  const parsed = schema.safeParse(formData)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message)
  }
  const { email, password } = parsed.data
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("invalid:credentials")
  }

  const matchPassword = bcrypt.compareSync(password, user.password)

  if (!matchPassword) {
    throw new Error("invalid:passoword")
  }

  const data = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role
  }

  await signIn("credentials", { ...data, redirect: false })
  redirect("/")
}
