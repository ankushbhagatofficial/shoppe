import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Seller from "@/lib/model/seller.model";

export const metadata: Metadata = {
  title: "Shoppe | Dashboard",
  description: "Shoppe Dashboard",
  icons: "/favicon.ico"
};

export default async function page() {
  const session = await auth()
  const user = session?.user
  await connectDB()

  if (user?.role === "seller") {
    const seller = await Seller.findById(user?.id)
    if (!seller.onboardingComplete) {
      redirect("/seller/onboarding")
    }

  }

  if (user?.role === "admin") {
    redirect("/dashboard/admin")
  }
  else if (user?.role === "seller") {
    redirect("/dashboard/seller")
  }

  redirect("/")
}
