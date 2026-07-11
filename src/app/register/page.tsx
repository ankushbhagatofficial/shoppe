import connectDB from "@/lib/mongodb"
import Register from "@/components/Register"
import Admin from "@/lib/model/admin.model"

export default async function page() {
  await connectDB()
  const admin = await Admin.findOne().sort({ _id: 1 })
  return <Register admin={!!admin} />
}

