import { auth } from "@/lib/auth";
import Seller from "@/lib/model/seller.model"
import { uploadFileOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get("image") as File
    const type = formData.get("type") as string

    if (!(image instanceof File)) {
      return Response.json({
        messsage: "Image file is required."
      }, { status: 400 })
    }

    const MAX_SIZE = 5 * 1024 * 1024; 
    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!ALLOWED_TYPES.includes(image.type)) {
      return Response.json(
        { error: "Only JPG, PNG, WebP, and AVIF images are allowed." },
        { status: 400 }
      );
    }

    if (image.size > MAX_SIZE) {
      return Response.json(
        { error: "Image must be smaller than 5 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image?.arrayBuffer())

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

    const result = await uploadFileOnCloudinary(buffer, { folder: `sellers/${user?.id}/products`, overwrite: true })
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
