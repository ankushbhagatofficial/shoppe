import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import Product from "@/lib/model/product.model"
import "@/lib/model/category.model"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
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

    const product = await Product.findById(id).populate("category", "_id, name").lean()

    return Response.json({
      product: {
        productName: product.name,
        brand: product.brand,
        tags: product.tags,
        slug: product.slug,
        category: {
          id: product?.category._id,
          name: product?.category.name,
        },
        shortDesc: product.shortDesc,
        description: product.description,
        cod: product.cod,
      },
      variants: product.variants

    })
  } catch (error) {
    console.log(error)
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

