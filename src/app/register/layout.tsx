import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shoppe | Register",
  description: "Create Shoppe Account",
  icons: "/favicon.ico"
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

