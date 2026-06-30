import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await connectDB()

    const session = await auth()
    const id = session?.user.id

    const seller = await Seller.findById(id)

    if (email === seller.email) {
      return Response.json({
        message: "New email must be diffrent from the current email."
      },
        {
          status: 400
        }
      )
    }

    if (!seller) {
      return Response.json({
        message: "User not found!"
      }, { status: 400 })
    }

    seller.email = email
    await seller.save()

    return new Response(null, { status: 200 })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}



