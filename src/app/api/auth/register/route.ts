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
      return Response.json({
        message: result.error.flatten()
      }, { status: 400 })
    }

    await connectDB()
    const { name, email, password } = result.data

    const hashPassword = bcrypt.hashSync(password, 10)

    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
      return Response.json({
        message: "exists:user"
      }, { status: 409 })

    }

    await User.create({
      name,
      email,
      password: hashPassword,
    })

    return Response.json({
      message: "created:user"
    })

  } catch (error) {
    return Response.json({
      error: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
