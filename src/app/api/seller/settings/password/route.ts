import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
  try {
    const { currentPassword, newPassword } = await req.json()
    await connectDB()

    const session = await auth()
    const id = session?.user.id

    const seller = await Seller.findById(id)

    const matchPassword = bcrypt.compareSync(currentPassword, seller.password)

    if (!matchPassword) {
      return Response.json({
        message: "Current password is incorrect."
      },
        {
          status: 400
        }
      )
    }

    const isSamePassword = bcrypt.compareSync(newPassword, seller.password)

    if (isSamePassword) {
      return Response.json({
        message: "New password must be diffrent from the current passsword."
      },
        {
          status: 400
        }
      )
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10)

    seller.password = hashPassword
    await seller.save()

    if (!seller) {
      return Response.json({
        message: "Seller not found!"
      }, { status: 400 })
    }

    return new Response(null, { status: 200 })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}


