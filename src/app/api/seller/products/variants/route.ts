import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import Product from "@/lib/model/product.model"

export async function POST(req: Request) {
  try {
    const { slug, variants } = await req.json()
    await connectDB()

    const session = await auth()
    const user = session?.user

    const seller = await Seller.findById(user?.id)

    if (!seller) {
      return Response.json(
        { message: "Seller not found." },
        { status: 404 }
      );
    }

    const product = await Product.findOne({ slug })
    if (!product) {
      return Response.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }
    product.variants = variants

    return new Response()

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

