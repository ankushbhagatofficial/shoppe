import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Seller from "@/lib/model/seller.model";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user
  await connectDB()

  if (user?.role === "seller") {
    const seller = await Seller.findById(user?.id)
    if (seller.onboardingComplete) {
      redirect("/dashboard/seller")
    }
  }

  return (
    <div>{children}</div>
  )

}

