"use server"

import { z } from "zod"
import connectDB from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import User from "@/lib/model/user.model"
import Seller from "@/lib/model/seller.model"
import Admin from "@/lib/model/admin.model"
import { redirect } from "next/navigation"

const schema = z.object({
  email: z.email(),
  password: z.string()
})

export async function loginAction(formData: { email: string, password: string }, role = "user", remember = true): Promise<{ success: boolean, message: string }> {
  await connectDB()

  const parsed = schema.safeParse(formData)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message)
  }
  const { email, password } = parsed.data

  let Model, redirectPath
  if (role === "seller") {
    Model = Seller
    redirectPath = "/dashboard/seller"
  }
  else if (role === "admin") {
    Model = Admin
    redirectPath = "/dashboard/admin"
  }
  else {
    Model = User
    redirectPath = "/"
  }

  const user = await Model.findOne({ email })

  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials"
    }
  }

  const matchPassword = bcrypt.compareSync(password, user.password)

  if (!matchPassword) {
    return {
      success: false,
      message: "Wrong Passoword"
    }
  }

  const data = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    remember
  }

  await signIn("credentials", { ...data, redirect: false })

  redirect(redirectPath)
}
