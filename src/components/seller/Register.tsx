"use client"

import axios from "axios"
import { AnimatePresence, motion } from "motion/react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { ChangeEvent, useState } from "react"
import { sellerAction } from "@/actions/register"

type Seller = {
  name: string,
  store: string,
  email: string,
  phone: string,
  password: string,
}

type FieldErrors = {
  name?: string,
  store?: string,
  email?: string,
  phone?: string,
  password?: string,
}

export default function Register({ setStep }: { setStep?: Function }) {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [formData, setFormData] = useState<Seller>({
    name: "",
    store: "",
    email: "",
    phone: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)

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
    setLoading(true)
    setErrorMessage("")
    setFieldErrors({})
    console.log(formData);

    const result = await sellerAction(formData)
    if (!result?.success) {
      setFieldErrors(result?.errors)
      setErrorMessage(result?.message)
    }

    setLoading(false)
  }

  return (
    <div className="w-full">
      <button onClick={() => setStep?.(1)} className="fixed cursor-pointer top-2 left-2 flex items-center justify-center p-2 rounded-full bg-neutral-700">
        <Icon className="text-xl leading-none" icon="mingcute:back-fill" />
      </button>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 font-poppins select-none">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Create your seller account</h1>
          <p className="text-xs lg:text-sm">Fill the details below to get started.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Store Name</label>
          <input className="border-2 p-2 rounded-md text-sm" type="text" name="store" placeholder="Enter your store name" />
          {fieldErrors?.store && <span className="mt-1 text-xs text-red-500">{fieldErrors?.store}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Owner Name</label>
          <input className="border-2 p-2 rounded-md text-sm" type="text" name="name" placeholder="Enter your full name" />
          {fieldErrors?.name && <span className="mt-1 text-xs text-red-500">{fieldErrors?.name}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Business Email</label>
          <input className="border-2 p-2 rounded-md text-sm" type="email" name="email" placeholder="Enter your email address" />
          {fieldErrors?.email && <span className="mt-1 text-xs text-red-500">{fieldErrors?.email}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Phone Number</label>
          <input className="border-2 p-2 rounded-md text-sm" type="number" name="phone" placeholder="Enter your phone number" />
          {fieldErrors?.phone && <span className="mt-1 text-xs text-red-500">{fieldErrors?.phone}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Password</label>
          <input className="border-2 p-2 rounded-md text-sm" type="password" name="password" placeholder="Enter your passowrd" autoComplete="new-password" />
          {fieldErrors?.password && <span className="mt-1 text-xs text-red-500">{fieldErrors?.password}</span>}
        </div>
        <label className="flex text-xs gap-2">
          <input onChange={() => setChecked(!checked)} checked={checked} className="hidden" type="checkbox" name="term" />
          <div className={`flex flex-none w-3.5 h-3.5 justify-center items-center border-2 border-white rounded-xs ${checked && "bg-blue-700"}`}>
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
          <p className="text-xs leading-none">I agree to the{" "}
            <a href="/terms" className="underline font-semibold">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/policy" className="underline font-semibold">
              Privacy Policy
            </a>
          </p>
        </label>

        <AnimatePresence>
          {!!errorMessage &&
            <motion.div exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
              <p className="text-xs text-red-500">{errorMessage}</p>
            </motion.div>
          }
        </AnimatePresence>

        <button type="submit" className="flex justify-center item-center leading-5 disabled:border-transparent disabled:opacity-70 disabled:cursor-default h-10 p-2 mt-2 bg-blue-800 select-none font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200">
          {loading ? <Icon className="" fontSize={25} icon="line-md:loading-loop" /> : "Create Account"}
        </button>
        <div className="flex gap-1 justify-center text-xs">
          <p>
            Already a seller?
          </p>
          <Link className="underline font-semibold" href="/seller/login" >Login</Link>
        </div>
      </form>
    </div>
  )
}

