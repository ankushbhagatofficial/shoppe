import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import { profileSchema } from "@/lib/zod/seller/settings.schema";

export async function PATCH(req: Request) {
  try {
    const data = await req.json()
    await connectDB()

    const result = await profileSchema.safeParseAsync({
      name: data.name,
      gstNumber: data.business.gstNumber,
      businessAddress: data.business.businessAddress,
      storeName: data.store.name,
      storeURL: data.store.url,
      storeDescription: data.store.description
    })

    let errors: Record<string, string[] | string> = {}

    if (!result.success) {
      errors = result.error.flatten().fieldErrors
    }

    // errors["abc"] = "test"

    if (Object.keys(errors).length > 0) {
      return Response.json({
        errors
      }, {
        status: 400
      })
    }

    if (result.success) {

      const session = await auth()
      const id = session?.user.id

      const { name, gstNumber, businessAddress, storeName, storeURL, storeDescription } = result.data

      const seller = await Seller.findByIdAndUpdate(id, {
        name,
        business: {
          gstNumber,
          businessAddress,
        },
        "store.name": storeName,
        "store.url": storeURL,
        "store.description": storeDescription
      })

      if (!seller) {
        return Response.json({
          message: "User not found!"
        }, { status: 400 })
      }

      return new Response(null, { status: 200 })
    }

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}

