import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import Product from "@/lib/model/product.model"
import "@/lib/model/category.model"

export async function GET(req: Request) {
  try {
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

    const { searchParams: params } = new URL(req.url)

    const page = Math.max(1, Number(params.get("page")) || 1)
    const limit = Math.max(1, Number(params.get("limit")) || 10)
    const skip = (page - 1) * limit

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("category")
      .lean()

    const [total, draft, active, inactive] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: "draft" }),
      Product.countDocuments({ status: "active" }),
      Product.countDocuments({ status: "inactive" }),
    ])

    return Response.json({
      products: products.map(product => {
        const stock = product.variants.reduce((sum: any, variant: any) => sum + variant.stock, 0)
        const prices = product.variants.map((v: any) => v.price)

        const min = Math.min(...prices)
        const max = Math.max(...prices)

        const priceRange = !prices.length ? "N/A" :
          min === max ? `₹${min}` : `₹${min} - ₹${max}`

        return {
          id: product._id,
          name: product.name,
          slug: product.slug,
          stock,
          priceRange,
          variants: product.variants.lenght ?? 0,
          category: product?.category?.name,
          status: product.status,
          sales: product.sales,
          updatedAt: new Date(product.updatedAt).toLocaleDateString()
        }
      }),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        total,
        draft,
        active,
        inactive,
      }
    })
  } catch (error) {
    console.log(error)
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}
