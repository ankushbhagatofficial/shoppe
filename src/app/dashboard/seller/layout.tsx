import { ReactNode } from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Seller from "@/lib/model/seller.model";

export const metadata: Metadata = {
  title: "Shoppe | Seller Dashboard",
  description: "Manage products, orders and settings.",
  icons: "/favicon.ico"
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user
  await connectDB()

  if (user?.role === "seller") {
    const seller = await Seller.findById(user?.id)
    if (!seller) redirect("/logout")
    if (!seller.onboardingComplete) redirect("/seller/onboarding")
  } else {
    redirect("/seller/login")
  }

  return (
    <div>
      <Sidebar session={session}>{children}</Sidebar>
    </div>
  )
}

