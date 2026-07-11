import { auth } from "@/lib/auth";
import Admin from "@/lib/model/admin.model";
import Category from "@/lib/model/category.model";
import connectDB from "@/lib/mongodb"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await params
    const { category, slug, active } = await req.json()
    await connectDB()

    const session = await auth()
    const user = session?.user

    const admin = await Admin.findById(user?.id)
    if (!!admin) {
      await Category.findByIdAndUpdate(id, {
        name: category,
        slug,
        active
      })

      return new Response(null)
    }
    else {
      return Response.json({ message: "Unauthorised access!" }, { status: 401 })
    }

  } catch (error) {
    return Response.json({
      message: process.env.NODE_ENV === "development" ? error : "Internal Server Error Occured!",
    }, { status: 500 })
  }
}


