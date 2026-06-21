"use client"

import Image from "next/image";
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link";

export default function Footer() {
  const linkSections = [
    {
      title: "Shop",
      links: [
        "Categories",
        "Best Sellers",
        "New Arrivals",
        "Offers & Deals",
        "Brands"
      ],
    },
    {
      title: "Customer Service",
      links: [
        "Help Center",
        "Contact Us",
        "Shipping Policy",
        "Returns & Refunds",
        "Track Your Orders"
      ],
    },

    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Blog",
        "Privacy Policy",
        "Terms & Conditions"
      ],
    },

    {
      title: "Seller",
      links: [
        "Become a Seller",
        "Seller Dashboard",
        "Seller Support",
        "Fee & Commission"
      ],
    },

  ]
  return (
    <footer className="border-t border-white/10 mt-5 pt-5 mx-5 md:mx-10">
      <div className="flex gap-10 justify-between flex-col lg:flex-row">
        <section className="flex flex-col gap-4 lg:w-60">
          <div className="flex items-center">
            <Image src="/logo.webp" alt="logo" width={36} height={36} />
            <div className="hidden min-[350px]:flex">
              <span className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</span>
              <span className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</span>
            </div>
          </div>
          <div>
            <p className="text-white/50">Your one-stop destination for quality products at the best prices. Shop more. save more with Shoppe.</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="text-orange-500">
                <Icon fontSize={30} icon="mdi:truck-outline" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Fast Delivery</h2>
                <p className="text-white/50 text-sm">Across India</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="text-orange-500">
                <Icon fontSize={30} icon="mdi:shield-check-outline" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Secure Payments</h2>
                <p className="text-white/50 text-sm">100% Safe & Secure</p>
              </div>
            </div>


            <div className="flex gap-2 items-center">
              <div className="text-orange-500">
                <Icon fontSize={30} icon="ic:round-loop" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Easy Returns</h2>
                <p className="text-white/50 text-sm">Hassle-free Returns</p>
              </div>
            </div>

          </div>
        </section>

        <div className="border border-white/10"></div>

        {linkSections.map(section => (
          <section key={section.title}>
            <h2 className="font-semibold">{section.title}</h2>
            <ul className="text-white/50 space-y-2 mt-4">
              {section.links.map(link => (
                <li key={link}>
                  <Link href="/">{link}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="my-5 py-5 border-t border-white/10 text-center text-white/80 text-sm">© 2026 Shoppe. All rights reserved.</div>
    </footer>
  )
}

