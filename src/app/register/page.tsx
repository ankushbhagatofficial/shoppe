import connectDB from "@/lib/mongodb"
import Register from "@/components/Register"
import User from "@/lib/model/user.model"

export default async function page() {
  await connectDB()
  const admin = await User.exists({ role: "admin" })
  return <Register admin={!!admin} />
}

