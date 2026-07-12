import { auth } from "@/lib/auth";
import Category from "@/lib/model/category.model";
import connectDB from "@/lib/mongodb"

export async function GET() {
  try {
    await connectDB()

    const session = await auth()
    const user = session?.user

    if (!user) {
      return Response.json({ message: "Unauthorized access!" }, { status: 401 })
    }

    const categories = await Category
      .find({ active: true })
      .sort({ name: 1 })

    return Response.json(categories.map(item => item.name))

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

