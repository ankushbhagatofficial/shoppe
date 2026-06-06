import { ReactNode } from "react";
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Shoppe | Admin Dashboard",
  description: "Manage products, orders, customers, sellers, etc.",
  icons: "/favicon.ico"
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <body>
      <Sidebar>{children}</Sidebar>
    </body>
  )
}

