"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: "material-symbols:dashboard-outline-rounded",
    },
    {
      href: "/admin/customers",
      label: "Customers",
      icon: "lucide:users",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: "material-symbols:featured-seasonal-and-gifts-rounded",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: "material-symbols:shopping-cart-outline-rounded",
    },
    {
      href: "/admin/sellers",
      label: "Sellers",
      icon: "material-symbols:store-outline-rounded",
    },
    {
      href: "/admin/chat",
      label: "Chat",
      icon: "material-symbols:chat-outline-rounded",
    }
  ]
  useEffect(() => {
    const hideSidebar = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", hideSidebar)
    return () => {
      document.removeEventListener("mousedown", hideSidebar)
    }
  }, [])

  return (
    <div>
      <div className={`fixed -z-10 transition-all duration-400 ${open && "bg-white/15 backdrop-blur-xs z-1"} w-full h-dvh`}></div>
      <aside className={`${open ? "left-0" : "-left-full"} z-10 transition-all duration-400 w-75 h-dvh bg-neutral-800 fixed lg:left-0`}>
        <nav ref={navRef} className="flex flex-col p-5 justify-between h-dvh font-poppins">
          <div className="flex flex-col gap-5 font-poppins">
            <div className="flex items-center px-4">
              <Image src="/logo.webp" alt="logo" width={36} height={36} />
              <div className="hidden min-[350px]:flex">
                <span className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</span>
                <span className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</span>
              </div>
            </div>
            {
              links.map((item, key) => (
                <Link onClick={() => setOpen(false)} href={item.href} key={key} className={`flex px-5 py-2 items-center gap-3 rounded-full ${pathname === item.href ? "bg-blue-700 cursor-default" : "active:bg-neutral-700 hover:bg-neutral-700"}`}><Icon fontSize={20} icon={item.icon} />{item.label}</Link>
              ))
            }
          </div>
          <div>
            <Link href="/logout" className="flex px-5 mb-10 py-2 gap-3 items-center rounded-full bg-neutral-700" ><Icon icon="line-md:log-out" />Logout</Link>
          </div>
        </nav>
      </aside>
      <div className="lg:ml-75">
        <nav className="flex justify-between px-2 border-b-2 border-white/20 mb-2 items-center h-12 w-full lg:hidden">
          <span onClick={() => setOpen(true)} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <g fill="none" stroke="currentColor" strokeDasharray="16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
                <path d="M5 5h16" strokeDashoffset="0" />
                <path strokeDashoffset="0" d="M5 12h16" />
                <path strokeDashoffset="0" d="M5 19h16" />
              </g>
            </svg>
          </span>
          <div>
            <span className="font-semibold">{links.find((item) => item.href === pathname)?.label}</span>
          </div>
        </nav>
        <main className="p-2">
          {children}
        </main>
      </div>
    </div>
  )
}

