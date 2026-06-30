import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"

export async function GET() {
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

    const sellerObj = seller.toObject();

    delete sellerObj._id;
    delete sellerObj.__v;
    delete sellerObj.documents;
    delete sellerObj.password;
    delete sellerObj.createdAt;
    delete sellerObj.updatedAt;

    return Response.json(sellerObj);

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }

}
