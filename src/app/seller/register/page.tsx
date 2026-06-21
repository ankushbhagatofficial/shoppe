"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Icon } from "@iconify/react"
import OnlineShop from "@/assets/online_shop.png"
import { ChangeEvent, useState } from "react"
import { sellerAction } from "@/actions/register"
import { SellerRegistration } from "@/types/seller"

function Benefits({ setStep }: { setStep?: Function }) {
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

function Register({ setStep }: { setStep?: Function }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<SellerRegistration>({
    name: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [fieldErrors, setFieldErrors] = useState<Partial<SellerRegistration>>({})
  const [showPassword, setShowPassword] = useState(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => (
      {
        ...prev,
        [name]: e.target.type === "checkbox" ? e.target.checked : value
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
      // setFieldErrors(result?.errors)
      // setErrorMessage(result?.message)
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
          <label className="font-semibold text-sm">Owner Name</label>
          <input onChange={handleOnChange} className="border-2 p-2 rounded-md text-sm" type="text" name="name" placeholder="Enter your full name" required />
          {fieldErrors?.name && <span className="mt-1 text-xs text-red-500">{fieldErrors?.name}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Email Address</label>
          <input onChange={handleOnChange} className="border-2 p-2 rounded-md text-sm" type="email" name="email" placeholder="Enter your email address" required />
          {fieldErrors?.email && <span className="mt-1 text-xs text-red-500">{fieldErrors?.email}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Phone Number</label>
          <input onChange={handleOnChange} maxLength={10} minLength={10} className="border-2 p-2 rounded-md text-sm" type="tel" name="phone" placeholder="Enter your phone number" required />
          {fieldErrors?.phone && <span className="mt-1 text-xs text-red-500">{fieldErrors?.phone}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">Password</label>
          <div className="relative">
            <input onChange={handleOnChange} className="border-2 p-2 rounded-md text-sm w-full" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your passowrd" autoComplete="new-password" required />
            <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
          </div>
          {fieldErrors?.password && <span className="mt-1 text-xs text-red-500">{fieldErrors?.password}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex text-xs gap-2">
            <input onChange={handleOnChange} checked={formData.terms} className="hidden" type="checkbox" name="terms" />
            <div className={`flex flex-none w-3.5 h-3.5 justify-center items-center border-2 border-white rounded-xs ${formData.terms && "bg-blue-700"}`}>
              <svg
                className={`w-full h-full transition-opacity duration-200 ${formData.terms ? "opacity-100" : "opacity-0"}`}
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
                  strokeDashoffset={formData.terms ? 0 : 24}
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
          {fieldErrors?.terms && <span className="mt-1 text-xs text-red-500">{fieldErrors?.terms}</span>}
        </div>

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

export default function page() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <div className="lg:hidden overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div
              key="benefits"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{
                duration: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <Benefits setStep={setStep} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{
                duration: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="flex h-dvh justify-center items-center"
            >
              <div className="max-w-[90dvw] w-150 bg-neutral-800 p-5 rounded-xl">
                <Register setStep={setStep} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden lg:flex lg:justify-center lg:items-center lg:h-dvh">
        <div className="grid grid-cols-[1.5fr_1fr] bg-neutral-800 rounded-xl h-[85%] w-[80%]">
          <Benefits />
          <div className="flex justify-center border-l border-white/20 p-5 overflow-y-auto">
            <Register />
          </div>
        </div>
      </div>
    </div>
  )
}


