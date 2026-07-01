import "./globals.css";
import { Inter, Poppins, Nunito } from "next/font/google";
import type { Metadata } from "next";
import Provider from "@/provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppe",
  description: "Discover trending products, top brands, and the best deals from multiple sellers in one place.",
  icons: "/favicon.ico"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${nunito.variable} h-full antialiased`}
    >
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html >
  );
}
