"use client"

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "motion/react"
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import SearchIcon from '@iconify-react/fa-solid/search';
import ShoppingIcon from '@iconify-react/mdi/shopping';
import AccountCircleIcon from '@iconify-react/material-symbols/account-circle';

export default function Navbar({ session, cart }: any) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdown, setDropdown] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

  useEffect(() => {
    const hideDropdown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", hideDropdown)
    return () => {
      document.removeEventListener("mousedown", hideDropdown)
    }
  }, [])

  return (
    <nav className="relative px-5 md:px-10 py-2 pb-4">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <Image src="/logo.webp" alt="logo" width={36} height={36} />
          <div className="hidden min-[350px]:flex">
            <span className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</span>
            <span className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <div className="relative bg-red flex justify-center item-center">
            <input className="border-white hidden text-sm md:block border-2 rounded-full p-1.5 px-4 pr-10 outline-0" type="text" placeholder="Search product" />
            <div onClick={() => setMobileSearch(true)} className="relative pointer-events-auto md:pointer-events-none md:absolute rounded-full md:right-2 md:top-1/2 md:-translate-y-1/2 p-1 cursor-pointer">
              <SearchIcon height="20" />
            </div>
          </div>
          {!session ?
            <Link href="/login" title="Profile">
              <button className="cursor-pointer flex" type="button">
                <AccountCircleIcon height="30" />
              </button>
            </Link>
            :
            <div ref={dropdownRef} className="relative">
              <button onClick={() => setDropdown(!dropdown)} className="cursor-pointer flex" type="button">
                <AccountCircleIcon height="30" />
              </button>
              <AnimatePresence>
                {dropdown &&
                  <motion.div exit={{ opacity: 0.1 }} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.1 }} className="absolute w-60 bg-neutral-900 shadow-sm shadow-[rgba(100,100,100,0.2)] font-poppins rounded-lg top-14 -right-14 z-20">
                    <div className="flex flex-col justify-center items-center p-5 gap-y-5">
                      <h2 className="text-lg font-semibold">{session.user.name}</h2>
                      <div className="flex flex-col gap-y-2 select-none justify-center items-center">
                        <Link className="underline-animate" href="/account" type="button">My Account</Link>
                        <Link className="underline-animate" href="/orders" type="button">Orders</Link>
                        <Link className="underline-animate" href="/wishlist" type="button">Wishlist</Link>
                        <Link className="underline-animate" href="settings" type="button">Settings</Link>
                      </div>
                      <button onClick={() => signOut()} className="select-none font-semibold cursor-pointer rounded-full bg-orange-500 text-white p-1 px-4 hover:brightness-90 transition-all duration-200" type="button">Logout</button>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          }
          <Link className="relative" href="/cart" >
            <button className="cursor-pointer flex" type="button">
              <ShoppingIcon height="25" />
            </button>
            <div className="absolute text-orange-500 text-xs font-bold -top-2 -right-2">
              <span className="text-[8px] w-4.5 h-4.5 flex justify-center items-center bg-orange-500 text-white rounded-full ">{cart > 99 ? "99+" : cart}</span>
            </div>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileSearch &&
          <motion.div exit={{ opacity: 0.1 }} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.1 }} className="absolute top-0 bg-neutral-900 w-full h-screen left-0 p-2 shadow-md z-12">
            <div className="w-full flex gap-x-2 justify-center items-center mb-4">
              <div className="relative bg-red flex justify-center item-center w-full">
                <input className="border-white text-sm border-2 rounded-full outline-0 p-3 pl-4 pr-10 w-full" type="text" placeholder="Search product" autoFocus />
                <div onClick={() => setMobileSearch(false)}  className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-1">
                  <Icon className="text-xl" icon="fa6-solid:xmark" />
                </div>
              </div>
            </div>
            <div className="flex justify-center font-poppins">
              <h3 className="text-lg">No search result found</h3>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav >
  )
}

