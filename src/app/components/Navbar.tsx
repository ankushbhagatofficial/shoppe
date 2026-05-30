import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react"
import { useState } from "react";

export default function Navbar() {
  let cartI = 0
  const [mobileSearch, setMobileSearch] = useState(false)

  return (
    <nav className="relative px-2">
      <div className="flex justify-between items-center p-2">
        <div className="flex justify-center items-center">
          <Image src="/logo.webp" alt="logo" width={36} height={36} />
          <div className="hidden min-[350px]:flex">
            <h2 className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</h2>
            <h2 className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</h2>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <div className="relative bg-red flex justify-center item-center">
            <input className="border-white hidden text-sm md:block border-2 rounded-full p-1.5 px-4 pr-10 outline-0" type="text" placeholder="Search product" />
            <div onClick={() => setMobileSearch(true)} className="relative pointer-events-auto md:pointer-events-none md:absolute rounded-full md:right-2 md:top-1/2 md:-translate-y-1/2 p-1 cursor-pointer">
              <Icon className="text-xl" icon="fa-solid:search" />
            </div>
          </div>
          <Link href="/login" title="Profile">
            <button className="cursor-pointer flex" type="button">
              <Icon className="text-white text-3xl" icon="material-symbols:account-circle" />
            </button>
          </Link>
          <Link className="relative" href="/cart" >
            <button className="cursor-pointer flex" type="button">
              <Icon className="text-white text-2xl" icon="famicons:bag" />
            </button>
            <div className="absolute text-orange-500 text-xs font-bold -top-3 -right-2">
              <span>{cartI}</span>
            </div>
          </Link>
        </div>
      </div>

      {mobileSearch &&
        <div className="absolute top-0 bg-gray-950 w-full h-screen left-0 p-2 shadow-md">
          <div className="w-full flex gap-x-2 justify-center items-center mb-4">
            <div className="relative bg-red flex justify-center item-center w-full">
              <input className="border-white text-sm border-2 rounded-full outline-0 p-3 pl-4 pr-10 w-full" type="text" placeholder="Search product" autoFocus />
              <div className="absolute rounded-full right-2 top-1/2 -translate-y-1/2 p-1">
                <Icon className="text-xl" icon="fa6-solid:xmark" />
              </div>
            </div>
            <button onClick={() => setMobileSearch(false)} type="button" className="cursor-pointer font-poppins">Cancel</button>
          </div>
          <div className="flex justify-center font-poppins">
            <h3 className="text-lg">No search result found</h3>
          </div>
        </div>
      }
    </nav >
  )
}

