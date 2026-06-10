import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shoppe | Dashboard",
  description: "Shoppe Dashboard",
  icons: "/favicon.ico"
};


export default async function page() {
  const session = await auth()
  const user = session?.user

  if (user?.role === "admin") {
    redirect("/dashboard/admin")
  }
  else if (user?.role === "seller") {
    redirect("/dashboard/seller")
  }

  redirect("/")
}
