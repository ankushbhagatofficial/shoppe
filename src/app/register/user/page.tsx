"use client"

import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image";
import { Google } from "@/actions/OAuth"
import axios from "axios"

type FieldErrors = {
  name?: string,
  email?: string,
  password?: string,
  cpassword?: string
}

export default function page() {
  const router = useRouter()
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)
  const [formData, setFormData] = useState({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data === "oatuh.success") {
        router.refresh()
      }
      setLoadingB(false)
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  const handleOnChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement

    setFormData(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault()
    setLoadingA(true)
    setFieldErrors({})

    try {
      const res = await axios.post("/api/auth/register", formData)
      console.log(res.data);
      if (res.status === 200) {
        // router.push("/auth/verify")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 400) {
          setFieldErrors(error?.response?.data?.message.fieldErrors)
        }
      }
    }
    setLoadingA(false)
  }

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden font-poppins">
      <button onClick={() => router.back()} className="fixed cursor-pointer top-2 left-2 flex items-center justify-center p-2 rounded-full bg-neutral-700">
        <Icon className="text-xl leading-none" icon="mingcute:back-fill" />
      </button>

      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center items-center bg-neutral-800 rounded-xl w-150 max-w-[90dvw] py-10">
        <form onSubmit={handleSubmit} className="flex flex-col w-[80%] gap-3">
          <h1 className="text-xl md:text-2xl font-bold select-none text-center">Create your account</h1>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Full Name</label>
            <input onChange={handleOnChange} autoFocus className="text-sm border-2 border-gray-400 rounded p-2 outline-0 focus:border-white" type="text" name="name" placeholder="Enter your name" required />
            {fieldErrors?.name && <span className="mt-1 text-xs text-red-500">{fieldErrors?.name}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email Address</label>
            <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 rounded p-2 outline-0 focus:border-white" type="email" name="email" placeholder="Enter email address" required />
            {fieldErrors?.email && <span className="mt-1 text-xs text-red-500">{fieldErrors?.email}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <div className="relative">
              <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 rounded p-2 w-full outline-0 focus:border-white" type={showPassword ? "text" : "password"} name="password" placeholder="Type your password" autoComplete="new-password" required />
              <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
            </div>
            {fieldErrors?.password && <span className="mt-1 text-xs text-red-500">{fieldErrors?.password}</span>}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 rounded p-2 w-full outline-0 focus:border-white" type={showPassword ? "text" : "password"} name="cpassword" placeholder="Confirm your password" autoComplete="new-password" required />
              <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
            </div>
            {fieldErrors?.cpassword && <span className="mt-1 text-xs text-red-500">{fieldErrors?.cpassword}</span>}
          </div>

          <div className="flex flex-col gap-y-1">
            <button disabled={!!loadingA || !!loadingB} className="flex justify-center item-center leading-5 disabled:border-transparent disabled:opacity-70 disabled:cursor-default h-10 p-2 mt-2 bg-blue-800 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200" type="submit">
              {loadingA ? <Icon className="" fontSize={25} icon="line-md:loading-loop" /> : "Register"}
            </button>
            <button disabled={!!loadingA || !!loadingB} onClick={() => Google(() => setLoadingB(true))} className="flex justify-center items-center relative disabled:opacity-70 disabled:cursor-default p-2 mt-2 w-full text-white bg-neutral-900 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:border-white active:border-white transition-all duration-200" type="button">
              <Image className="absolute saturate-150 left-2 top-1/2 -translate-y-1/2" src="/google.png" alt="google" width={25} height={25} />
              {loadingB ? <Icon className="" fontSize={25} icon="line-md:loading-loop" /> : "Continue with Google"}
            </button>
          </div>
          <Link className="text-center text-sm" href={"/login"} >Already have an account? <u className="font-bold">Login</u></Link>
        </form>
      </motion.div>

    </main>
  )
}

