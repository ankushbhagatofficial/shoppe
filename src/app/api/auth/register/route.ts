import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/lib/model/user.model"
import { userSchema } from "@/lib/zod/user.schema"

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type")

    if (!contentType?.includes("application/json")) {
      return Response.json(
        { error: "Content-Type must be application/json" },
        { status: 415 }
      )
    }
    const body = await req.json()

    const result = userSchema.safeParse(body)

    if (!result.success) {
      const message = result.error.flatten()
      return Response.json({
        message
      }, { status: 400 })
    }

    const { name, email, password, role } = result.data

    await connectDB()

    const hashPassword = bcrypt.hashSync(password, 10)

    const isAdminExists = await User.exists({role: "admin"})
   if (isAdminExists) {
      return Response.json({
        message: "Internal Error"
      }, { status: 409 })

    }
    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
      return Response.json({
        message: "Email already used try diffrent."
      }, { status: 409 })

    }

    const user = await User.create({
      name,
      email,
      role,
      password: hashPassword,
    })

    return Response.json({
      user,
      message: "created:user"
    })

  } catch (error) {
    return Response.json({
      error: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
