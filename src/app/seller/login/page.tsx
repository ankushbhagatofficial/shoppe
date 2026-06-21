"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Icon } from "@iconify/react"
import { SyntheticEvent, useState } from "react"
import { loginAction } from "@/actions/login"

export default function page() {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await loginAction({ email, password }, "seller", remember)
    if (!result.success) {
      setError(result.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex h-dvh justify-center items-center">
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-4 bg-neutral-800 w-150 max-w-[90dvw] p-10 rounded-xl">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Welcome Back, Seller</h1>
          <p className="text-sm">Sign in to access your seller dashboard</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Email Address</label>
          <input required onChange={(e) => setEmail(e.target.value)} className="border-2 p-2 rounded-md text-sm" type="email" name="email" placeholder="Enter your email address" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Password</label>
          <div className="relative">
            <input required onChange={(e) => setPassword(e.target.value)} className="w-full border-2 p-2 rounded-md text-sm" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your passowrd" />
            <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
          </div>
        </div>

        {error &&
          <div className="text-xs -my-2 text-red-500">{error}
          </div>
        }

        <div className="flex justify-between">
          <label className="flex gap-2 text-sm">
            <input onChange={(e) => setRemember(e.target.checked)} type="checkbox" name="remember" />
            <p>Remeber me</p>
          </label>
          <a className="underline text-sm" href="/forgot">Forgot Password?</a>
        </div>

        <button type="submit" className="flex justify-center item-center leading-5 disabled:border-transparent disabled:opacity-70 disabled:cursor-default h-10 p-2 mt-2 bg-blue-800 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200">
          {loading ? <Icon className="" fontSize={25} icon="line-md:loading-loop" /> : "Sign in to Seller Dashboard"}
        </button>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 text-sm">
          <p>Don't have seller account?</p>
          <Link className="underline" href="/seller/register">Create Seller Account</Link>
        </div>

      </form>
    </div>
  )
}

