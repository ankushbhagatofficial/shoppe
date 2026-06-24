import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import { sellerSchema } from "@/lib/zod/seller/register.schema"
import Seller from "@/lib/model/seller.model"

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

    const result = sellerSchema.safeParse(body)

    if (!result.success) {
      const message = result.error.flatten().fieldErrors
      return Response.json({
        message
      }, { status: 400 })
    }

    const { name, email, phone, password, terms } = result.data

    await connectDB()

    const hashPassword = bcrypt.hashSync(password, 10)

    const isUserExists = await Seller.findOne({ email })
    if (isUserExists) {
      return Response.json({
        message: "Email already used, try diffrent."
      }, { status: 409 })
    }

    const seller = await Seller.create({
      name,
      email,
      phone,
      terms,
      role: "seller",
      password: hashPassword,
    })

    return Response.json({
      seller,
      message: "created:seller"
    })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
