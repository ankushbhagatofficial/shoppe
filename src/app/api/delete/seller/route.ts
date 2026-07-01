import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import cloudinary from "@/lib/cloudinary";
import { redirect } from "next/navigation";

export async function DELETE() {
  try {
    await connectDB()

    const session = await auth()
    const id = session?.user.id

    const seller = await Seller.findById(id)

    if (!seller) {
      return Response.json({
        message: "User not found!"
      }, { status: 400 })
    }

    await cloudinary.api.delete_resources_by_prefix(`sellers/${id}`);
    await cloudinary.api.delete_folder(`sellers/${id}`);

    await seller.deleteOne()

    redirect("/logout")
  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}

