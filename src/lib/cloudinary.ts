import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadOnCloudinary = async (base64: string, path: string) => {
  try {
    return await cloudinary.uploader.upload(
      base64, {
      folder: path,
      resource_type: "auto"
    },
    )

  } catch (error) {
    if (error instanceof Error)
      throw error
    else
      throw error.error

  }
}

export default cloudinary
