import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UplaodOptions = {
  folder?: string,
  public_id?: string,
  overwrite?: boolean,
  resource_type?: "image" | "video" | "raw" | "auto",
  use_filename?: boolean,
  unique_filename?: boolean
}

export const uploadOnCloudinary = async (base64: string,
  {
    folder,
    public_id,
    overwrite = true,
    resource_type = "auto",
    use_filename = false,
    unique_filename = false,
  }: UplaodOptions) => {
  try {
    return await cloudinary.uploader.upload(
      base64, {
      folder,
      public_id,
      overwrite,
      resource_type,
      use_filename,
      unique_filename,
    },
    )

  } catch (error: any) {
    if (error instanceof Error)
      throw error
    else
      throw error.error

  }
}

export const uploadFileOnCloudinary = async (buffer: Buffer,
  {
    folder,
    public_id,
    overwrite = true,
    resource_type = "auto",
    use_filename = false,
    unique_filename = false,
  }: UplaodOptions): Promise<UploadApiResponse> => {
  try {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          public_id,
          overwrite,
          resource_type,
          use_filename,
          unique_filename,
        },
        (error, result) => {
          if (error) return reject(error)
          if (result) return resolve(result)
        }
      ).end(buffer)

    })
  } catch (error: any) {
    if (error instanceof Error)
      throw error
    else
      throw error
  }
}



export default cloudinary
