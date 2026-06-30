"use client"

import Image from "next/image";
import { Icon } from "@iconify/react"
import Link from "next/link";

export default function Footer() {
  const linkSections = [
    {
      title: "Shop",
      links: [
        { label: "Brands", href: "/products/brands" },
        { label: "Categories", href: "/products/categories" },
        { label: "Best Sellers", href: "/products/best-sellers" },
        { label: "New Arrivals", href: "/products/new" },
        { label: "Offers & Deals", href: "/products/offers&deals" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Shipping Policy", href: "/shipping-policy" },
        { label: "Returns & Refunds", href: "/orders/returns/refunds" },
        { label: "Track Your Orders", href: "/orders" }
      ],
    },

    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-conditions" }
      ],
    },

    {
      title: "Seller",
      links: [
        { label: "Become a Seller", href: "/seller/register" },
        { label: "Seller Dashboard", href: "/dashboard/seller" },
        { label: "Seller Support", href: "/seller/support" },
        { label: "Fee & Commission", href: "/commission" }
      ],
    },

  ]
  return (
    <footer className="border-t border-white/10 mt-5 pt-5 mx-5 md:mx-10">
      <div className="flex gap-10 flex-col lg:flex-row">
        <section className="flex flex-col gap-4 w-fit wrap-break-word">
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

        <section className="flex flex-col md:flex-row justify-between w-full gap-10">
          {linkSections.map(section => (
            <div key={section.title}>
              <h2 className="font-semibold">{section.title}</h2>
              <ul className="text-white/50 space-y-2 mt-4">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link className="underline-animate hover:text-white" href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
      <div className="my-5 py-5 border-t border-white/10 text-center text-white/80 text-sm">© 2026 Shoppe. All rights reserved.</div>
    </footer>
  )
}

