import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/model/user.model"
import Seller from "@/lib/model/seller.model";
import Admin from "@/lib/model/admin.model";

export async function GET() {
  try {
    await connectDB()
    const session = await auth()
    const user = session?.user

    let Modal

    if (user?.role === "seller") Modal = Seller
    else if (user?.role === "admin") Modal = Admin
    else if (user?.role === "user") Modal = User
    else Modal = User

    const data = await Modal.findById(user?.id)

    let image
    if (user?.role === "seller") image = data.store.logo.url
    else image = data.avatar.url

    return Response.json({ avatar: image })
  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
