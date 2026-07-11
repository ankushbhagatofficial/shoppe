import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import { userSchema } from "@/lib/zod/user.schema"
import Admin from "@/lib/model/admin.model"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const user = session?.user

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
      const errors = result.error.flatten().fieldErrors
      return Response.json({
        errors
      }, { status: 400 })
    }

    const { name, email, password } = result.data

    await connectDB()

    const hashPassword = bcrypt.hashSync(password, 10)

    const isAdminExists = await Admin.findOne({ email })
    if (isAdminExists) {
      return Response.json({
        message: "Email already used, try diffrent."
      }, { status: 409 })
    }

    const firstAdmin = await Admin.findOne().sort({ _id: 1 })
    if (!!firstAdmin && user?.id !== firstAdmin?._id.toString()) {
      return Response.json({
        message: "Access denied!"
      }, { status: 400 })
    }

    const admin = await Admin.create({
      name,
      email,
      role: "admin",
      password: hashPassword,
    })

    const data = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    }

    await signIn("credentials", { ...data, redirect: false })

    return new Response(null, { status: 200 })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}

