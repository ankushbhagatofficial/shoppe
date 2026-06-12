"use client"

import Image from "next/image"
import OnlineShop from "@/assets/online_shop.png"
import { Icon } from "@iconify/react"

export default function Benefits({ setStep }: { setStep?: Function }) {
  return (
    <div className="flex justify-center p-5">
      <div className="font-poppins flex flex-col gap-5 lg:w-full">
        <div className="w-70 pb-5">
          <h1 className="text-xl lg:text-2xl font-bold">Become a Seller</h1>
          <p className="text-sm">Start your selling journey with Shoppe and gorw your business.</p>
        </div>
        <div className="flex justify-center items-center gap-y-5 flex-col lg:flex-row-reverse">
          <div className="flex justify-center items-center w-full h-full">
            <Image width={300} src={OnlineShop} alt="" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <span className="flex justify-center items-center rounded-full bg-yellow-200 w-10 h-10">
                <Icon className="text-yellow-900" fontSize={25} icon="mdi:tag-outline" />
              </span>
              <div className="w-60">
                <h2 className="font-semibold text-md">Sell products</h2>
                <p className="text-xs">List your products and reach millions of buyers.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="flex justify-center items-center rounded-full bg-green-200 w-10 h-10">
                <Icon className="text-green-900" fontSize={25} icon="mdi:cube-outline" />
              </span>
              <div className="w-60">
                <h2 className="font-semibold text-md">Manage inventory</h2>
                <p className="text-xs">Easy manage orders, inventory and payments.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="flex justify-center items-center rounded-full bg-red-200 w-10 h-10">
                <Icon className="text-red-900" fontSize={25} icon="mdi:wallet-outline" />
              </span>
              <div className="w-60">
                <h2 className="font-semibold text-md">Get payouts</h2>
                <p className="text-xs">Receive secure and timely payouts to your bank account.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden">
          <button onClick={() => setStep?.(2)} className="bg-blue-800 font-semibold border-2 border-transparent active:border-white transition-all duration-200 p-2 rounded-full w-full" type="button">Create Seller Account</button>
        </div>
      </div>
    </div>
  )
}
