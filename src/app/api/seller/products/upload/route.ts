import { auth } from "@/lib/auth";
import Seller from "@/lib/model/seller.model"
import { uploadFileOnCloudinary } from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/model/product.model";

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const slug = formData.get("slug") as string
    const image = formData.get("image") as File

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

    const product = Product.findOne({ slug })

    if (!product) {
      return Response.json({ message: "Product not found!" }, { status: 404 })
    }

    const result = await uploadFileOnCloudinary(buffer, { folder: `sellers/${user?.id}/products/${slug}`, overwrite: true })
    const { secure_url, public_id } = result

    return Response.json({
      url: secure_url,
      publicId: public_id
    })
  } catch (error: any) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error?.message : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
