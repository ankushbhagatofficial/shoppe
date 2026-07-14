import { uploadFileOnCloudinary } from "@/lib/cloudinary"
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Seller from "@/lib/model/seller.model";

export async function POST(req: Request) {
  const session = await auth()
  const user = session?.user

  if (!user?.id) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

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

    const buffer = Buffer.from(await file?.arrayBuffer())

    const allowedTypes = {
      panCard: {
        path: "documents",
        folder: `sellers/${user?.id}/docs`,
        public_id: "pan",
      },
      identityCard: {
        path: "documents",
        folder: `sellers/${user?.id}/docs`,
        public_id: "identity",
      },
      gstCertificate: {
        path: "documents",
        folder: `sellers/${user?.id}/docs`,
        public_id: "gst",
      },
      banner: {
        path: "store",
        folder: `sellers/${user?.id}/store`,
        public_id: "banner",
      },
      logo: {
        path: "store",
        folder: `sellers/${user?.id}/store`,
        public_id: "logo",
      },
    }

    type AllowedTypes = keyof typeof allowedTypes

    const config = allowedTypes[type as AllowedTypes]

    if (!config) {
      return Response.json({
        messsage: "Invalid field type"
      }, { status: 400 })
    }

    await connectDB()
    const seller = await Seller.findById(user?.id)

    if (!seller) {
      return Response.json(
        { message: "Seller not found." },
        { status: 404 }
      );
    }

    const result = await uploadFileOnCloudinary(buffer, { folder: config.folder, public_id: config.public_id })
    const { secure_url, public_id } = result

    seller[config.path][type] = {
      url: secure_url,
      publicId: public_id
    }

    await seller.save()

    return Response.json({
      url: result?.secure_url,
    })

  } catch (error: any) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error?.message : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

