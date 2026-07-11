import { auth } from "@/lib/auth";
import Seller from "@/lib/model/seller.model"
import { uploadFileOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("image") as File
    const type = formData.get("type") as string

    if (!(file instanceof File)) {
      return Response.json({
        messsage: "Image file is required."
      }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json({
        messsage: "Image must be less than 5 MB."
      }, { status: 400 })
    }

    if (type !== "logo" && type !== "banner") {
      return Response.json({
        messsage: "Invalid type"
      }, { status: 400 })
    }

    const buffer = Buffer.from(await file?.arrayBuffer())

    const session = await auth()
    const user = session?.user

    await connectDB()
    const seller = await Seller.findById(user?.id)

    if (!seller) {
      return Response.json(
        { message: "Seller not found." },
        { status: 404 }
      );
    }

    const publicId = seller.store[type].publicId ?? `sellers/${user?.id}/${type}`

    const result = await uploadFileOnCloudinary(buffer, { public_id: publicId, overwrite: true })
    const { secure_url, public_id } = result

    seller.store[type] = {
      url: secure_url,
      publicId: public_id
    }

    await seller.save()

    return Response.json({
      url: secure_url,
    })
  } catch (error: any) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error?.message : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
