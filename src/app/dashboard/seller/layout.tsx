import { ReactNode } from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shoppe | Seller Dashboard",
  description: "Manage products, orders and settings.",
  icons: "/favicon.ico"
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  return (
    <div>
      <Sidebar session={session}>{children}</Sidebar>
    </div>
  )
}

