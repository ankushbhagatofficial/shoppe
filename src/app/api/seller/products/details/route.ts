import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb"
import Seller from "@/lib/model/seller.model"
import Product from "@/lib/model/product.model"
import slugify from "slugify";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const data = await req.json()
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

    const { productName, brand, tags, shortDesc, category, description, cod } = data

    const slug = data.slug ?? `${slugify(productName, {
      lower: true,
      strict: true,
    })}-${nanoid(6)}`;

    const newProduct = {
      name: productName,
      category: category.id,
      slug: slug,
      brand,
      tags,
      shortDesc,
      description,
      cod
    }

    const product = await Product.findOne({ slug })
    if (!!product) {
      product.set(newProduct)
      await product.save()
    } else {
      await Product.create(newProduct)
    }

    return new Response(newProduct.slug)

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

