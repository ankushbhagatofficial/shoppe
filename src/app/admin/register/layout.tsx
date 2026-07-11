import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/model/admin.model";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user
  await connectDB()

  const admin = await Admin.findOne().sort({ _id: 1 })
  if (!!admin && user?.id !== admin?._id.toString()) redirect("/admin/login")

  return (
    <div>{children}</div>
  )
}

