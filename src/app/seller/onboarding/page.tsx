"use client"

import Image from "next/image"
import OnlineShop from "@/assets/online_shop.png"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useState } from "react"

function signUp() {
  const [checked, setChecked] = useState(false)

  return (
    <form className="w-full flex flex-col gap-4 font-poppins">
      <div>
        <h1 className="text-2xl font-bold">Create your seller account</h1>
        <p className="text-sm">Fill the details below to get started.</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Store Name</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="text" name="store" placeholder="Enter your store name" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Full Name</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="text" name="name" placeholder="Enter your full name" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Email</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="email" name="email" placeholder="Enter your email address" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Phone Number</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="number" name="phone" placeholder="Enter your phone number" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Password</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="password" name="password" placeholder="Enter your passowrd" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">Confirm Password</label>
        <input className="border-2 p-1 px-2 rounded-md text-sm" type="password" name="cpassword" placeholder="Confirm your password" />
      </div>
      <div className="flex items-center gap-2 h-3.5">
        <label className="flex text-xs gap-1">
          <input onChange={() => setChecked(!checked)} checked={checked} className="hidden" type="checkbox" name="term" />
          <div className={`flex w-3.5 justify-center items-center border-2 border-white rounded-xs ${checked && "bg-blue-700"}`}>
            <svg
              className={`w-full h-full transition-opacity duration-200 ${checked ? "opacity-100" : "opacity-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13.5l4 4l10.75 -10.75"
                strokeDasharray="24"
                strokeDashoffset={checked ? 0 : 24}
                style={{
                  transition: "stroke-dashoffset 0.3s ease",
                }}
              />
            </svg>
          </div>
          <p className="text-sm leading-none">I agree to the{" "}
            <a href="/terms" className="underline font-semibold">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/policy" className="underline font-semibold">
              Privacy Policy
            </a>
          </p>
        </label>
      </div>
      <button type="submit" className="p-1.5 font-semibold text-sm bg-blue-800 rounded-full">Create Seller Account</button>
      <div className="flex gap-1 justify-center text-sm">
        <p>
          Already a seller?
        </p>
        <Link className="underline font-semibold" href="/dashboard/seller" >Login</Link>
      </div>
    </form>
  )
}

export default function page() {
  const steps = [signUp]
  const [step, setStep] = useState(0)
  const CurrentStep = steps[step]
  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:h-dvh">
      <div className="lg:grid lg:grid-cols-[1.5fr_1fr] lg:bg-neutral-800 lg:rounded-xl lg:h-[85%] lg:w-[80%]">
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
              <button className="bg-blue-800 border-2 border-transparent active:border-white transition-all duration-200 p-2 rounded-full w-full" type="button">Continue</button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:justify-center lg:border-l lg:border-white/20 lg:p-5 overflow-y-auto">
          <CurrentStep />
        </div>
      </div>
    </div>
  )
}

