"use client"

import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import Image from "next/image";
import { loginAction } from "@/app/actions/login"
import { ins } from "motion/react-client"

export default function page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginAction({ email, password })
    } catch (error) {
      if (error instanceof Error)
      console.log(error?.message);
    }
    setLoading(false)

  }

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden font-poppins">
      <button onClick={() => router.back()} className="fixed cursor-pointer top-2 left-2 flex items-center justify-center p-2 rounded-full bg-neutral-700">
        <Icon className="text-xl leading-none" icon="mingcute:back-fill" />
      </button>

      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center items-center bg-neutral-800 rounded-xl w-150 max-w-[90dvw] py-10">
        <form onSubmit={handleSubmit} className="flex flex-col w-[80%] gap-4">
          <h1 className="text-xl md:text-2xl font-bold select-none text-center">Login your account</h1>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email Address</label>
            <input onChange={(e) => setEmail(e.target.value)} className="text-sm border-2 border-gray-400 rounded p-2 outline-0 focus:border-white" type="email" name="email" placeholder="Enter email address" autoFocus required />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <div className="relative">
              <input onChange={(e) => setPassword(e.target.value)} className="text-sm border-2 border-gray-400 rounded p-2 w-full outline-0 focus:border-white" type={showPassword ? "text" : "password"} name="password" placeholder="Type your password" required />
              <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Link className="underline text-sm" href={"/forgotpassword"} >Forgot password?</Link>
            <button className="flex justify-center item-center h-10 p-2 mt-2 bg-blue-800 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200" type="submit">
              {loading ? <Icon className="" fontSize={25} icon="line-md:loading-loop" /> : "Login"}
            </button>
            <button className="relative p-2 mt-2 w-full text-white bg-neutral-900 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:border-white active:border-white transition-all duration-200" type="button">
              <Image className="absolute saturate-150 left-2 top-1/2 -translate-y-1/2" src="/google.png" alt="google" width={25} height={25} />
              Continue with Google
            </button>
          </div>
          <Link className="text-center text-sm" href={"/register"} >Don't have an account? <u className="font-bold">Register</u></Link>
        </form>
      </motion.div>

    </main>
  )
}


