"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Sidebar({ children, session }: { children: ReactNode, session: any }) {
  const [avatar, setAvatar] = useState("")
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const role = pathname.split("/")[2]

  useEffect(() => {
    const fetchAvatar = async () => {
      const res = await axios.get("/api/get/avatar")
      setAvatar(res.data?.avatar)
    }
    fetchAvatar()
  }, [])

  const links = [
    {
      href: "",
      label: "Dashboard",
      icon: "material-symbols:dashboard-outline-rounded",
    },
    {
      href: "/products",
      label: "Products",
      icon: "material-symbols:featured-seasonal-and-gifts-rounded",
    },
    {
      href: "/orders",
      label: "Orders",
      icon: "material-symbols:shopping-cart-outline-rounded",
    },
    {
      href: "/sellers",
      label: "Sellers",
      icon: "material-symbols:store-outline-rounded",
    },
    {
      href: "/users",
      label: "Users",
      icon: "lucide:users",
    },
    {
      href: "/chat",
      label: "Chat",
      icon: "material-symbols:chat-outline-rounded",
    },
  ]

  const paths = links.map(item => ({
    href: item.href,
    label: item.label
  }))

  paths.push({
    href: "/settings",
    label: "Settings"
  })

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
      <div className={`fixed -z-10 transition-all duration-400 ${open && "bg-white/15 backdrop-blur-xs z-30"} w-full h-dvh`}></div>
      <aside className={`${open ? "left-0" : "-left-full"} select-none z-50 transition-all duration-400 w-75 h-dvh bg-neutral-800 fixed lg:left-0`}>
        <nav ref={navRef} className="flex flex-col p-5 justify-between h-dvh font-poppins overflow-y-auto gap-5">
          <div className="flex flex-col gap-5 font-poppins">
            <Link href="/" className="flex items-center px-4 self-start">
              <Image src="/logo.webp" alt="logo" width={36} height={36} />
              <div className="hidden min-[350px]:flex">
                <span className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</span>
                <span className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</span>
              </div>
            </Link>
            {
              links.map((item, key) => {
                const href = `/dashboard/${role}${item.href}`
                if (role === "seller" && ["Sellers", "Users"].includes(item.label)) return

                return (
                  <Link onClick={() => setOpen(false)} href={href} key={key} className={`flex px-5 py-2 items-center gap-3 rounded-full ${pathname === href ? "bg-blue-700 cursor-default" : "active:bg-neutral-700 hover:bg-neutral-700"}`}><Icon fontSize={20} icon={item.icon} />{item.label}</Link>
                )
              })
            }
            <div className="flex flex-col gap-2">
              <span className="px-5 text-neutral-400/80">TOOLS</span>
              <div>
                <Link onClick={() => setOpen(false)} href={`/dashboard/${role}/settings`} className={`flex px-5 py-2 items-center gap-3 rounded-full ${pathname === `/dashboard/${role}/settings` ? "bg-blue-700 cursor-default" : "active:bg-neutral-700 hover:bg-neutral-700"}`} ><Icon fontSize={20} icon="mdi:gear-outline" />Account & Settings</Link>
              </div>
            </div>

            <div className="flex p-2 border border-white/20 rounded-md gap-2">
              <div className="w-10 h-10 rounded-full border border-white/40 flex justify-center items-center overflow-hidden">
                {avatar ?
                  <img className="h-[90%]" src={avatar} alt="" />
                  :
                  <Icon className="w-full h-[80%]" icon="line-md:person-filled" />
                }
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{session?.user?.name ?? "Owner Name"}</span>
                <span className="text-white/40 text-sm">{session?.user?.role ?? "Role"}</span>
              </div>
            </div>

          </div>
          <div className="flex flex-col mb-10 gap-5">
            <a href={"help"} className="flex px-5 py-2 gap-3 items-center rounded-full bg-neutral-700" ><Icon icon="material-symbols:help-outline-rounded" />Help & Support</a>
            <a href="/logout" className="flex px-5 py-2 gap-3 items-center rounded-full bg-neutral-700" ><Icon icon="line-md:log-out" />Logout</a>
          </div>
        </nav>
      </aside>
      <div className="lg:ml-75">
        <nav className=" flex justify-between px-2 border-b-2 border-white/20 mb-2 items-center h-12 w-full">
          <span onClick={() => setOpen(true)} className="cursor-pointer lg:hidden">
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
            <span className="font-semibold">{paths.find((item) => `/dashboard/${role}${item.href}` === pathname)?.label}</span>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800">
            <Icon fontSize={20} icon="mdi:notifications-none" />
          </div>
        </nav>
        <main className="p-2">
          {children}
        </main>
      </div>
    </div>
  )
}

