import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import { bankSchema } from "@/lib/zod/seller/settings.schema";

export async function PATCH(req: Request) {
  try {
    const formData = await req.json()

    const result = await bankSchema.safeParseAsync(formData.bank)

    if (!result.success) {
      return Response.json({
        errors: result.error.flatten().fieldErrors
      }, { status: 400 })
    }

    await connectDB()

    const session = await auth()
    const id = session?.user.id

    const seller = await Seller.findByIdAndUpdate(id, {
      bank: formData.bank
    })

    if (!seller) {
      return Response.json({
        message: "User not found!"
      }, { status: 400 })
    }

    return new Response(null, { status: 200 })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}

