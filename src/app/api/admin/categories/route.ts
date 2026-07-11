import { auth } from "@/lib/auth";
import Admin from "@/lib/model/admin.model";
import Category from "@/lib/model/category.model";
import connectDB from "@/lib/mongodb"

export async function GET(req: Request) {
  try {
    await connectDB()

    const session = await auth()
    const user = session?.user

    const admin = await Admin.findById(user?.id)
    if (!admin) {
      return Response.json({ message: "Unauthorized access!" }, { status: 401 })
    }

    const { searchParams: params } = new URL(req.url)

    const page = Math.max(1, Number(params.get("page")) || 1)
    const limit = Math.max(1, Number(params.get("limit")) || 10)
    const skip = (page - 1) * limit

    const [categories, total] = await Promise.all([
      Category.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Category.countDocuments()
    ])

    return Response.json({
      categories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {

    const { category, slug, active } = await req.json()
    await connectDB()

    const session = await auth()
    const user = session?.user

    const admin = await Admin.findById(user?.id)
    if (!admin) {
      return Response.json({ message: "Unauthorised access!" }, { status: 401 })
    }

    await Category.create({
      name: category,
      slug,
      active
    })

    return new Response()

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {

    const { ids } = await req.json()
    await connectDB()

    const session = await auth()
    const user = session?.user

    const admin = await Admin.findById(user?.id)
    if (!admin) {
      return Response.json({ message: "Unauthorised access!" }, { status: 401 })
    }

    await Category.deleteMany({
      _id: { $in: ids }
    })

    return new Response()

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}

