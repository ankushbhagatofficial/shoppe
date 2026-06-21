import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Seller Login",
  icons: "/favicon.ico"
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
  <div>{children}</div>
  )

}

