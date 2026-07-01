"use client"

import { Icon } from "@iconify/react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image";
import { Google } from "@/actions/OAuth"
import { registerAction } from "@/actions/register"
import { UserRegistration } from "@/types/user"

function Role({ admin, setStep }: { admin: boolean, setStep: Function }) {
  const [role, setRole] = useState("user")
  const router = useRouter()

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden">
      <button onClick={() => router.replace("/")} className="fixed cursor-pointer top-2 left-2 flex items-center justify-center p-2 rounded-full bg-neutral-700">
        <Icon className="text-xl leading-none" icon="mingcute:back-fill" />
      </button>
      <motion.div initial={{ y: 600, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-neutral-800 rounded-xl w-200 max-w-[90dvw] p-10">
        <div className="flex flex-col justify-center items-center gap-y-10 font-poppins">
          <div className="flex flex-col items-center">
            <h1 className="text-xl md:text-2xl font-bold select-none">Plesase Select your role</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col">
              <label>
                <input onChange={(e) => setRole(e.target.value)} className="hidden peer" type="radio" name="role" value="user" defaultChecked />
                <div className="flex flex-col cursor-pointer justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-green-500 peer-checked:text-green-400 peer-checked:bg-green-800 peer-checked:border-3 peer-checked:border-green-500 transition-all duration-200">
                  <Icon className="text-5xl md:text-8xl" icon="boxicons:user-filled" />
                  <h2 className="text-lg md:text-xl font-semibold select-none">User</h2>
                </div>
              </label>
            </div>

            <div className="flex flex-col">
              <label>
                <input onChange={(e) => setRole(e.target.value)} className="hidden peer" type="radio" name="role" value="seller" />
                <div className="flex flex-col cursor-pointer justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-yellow-600 peer-checked:text-yellow-700 peer-checked:bg-yellow-400 peer-checked:border-3 peer-checked:border-yellow-600 transition-all duration-200">
                  <Icon className="text-5xl md:text-8xl" icon="material-symbols:store-rounded" />
                  <h2 className="text-lg md:text-xl font-semibold select-none">Seller</h2>
                </div>
              </label>
            </div>

            {!admin &&
              <div className="flex flex-col">
                <label>
                  <input onChange={(e) => setRole(e.target.value)} className="hidden peer" type="radio" name="role" value="admin" />
                  <div className="flex flex-col cursor-pointer justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-red-600 peer-checked:text-red-700 peer-checked:bg-red-400 peer-checked:border-3 peer-checked:border-red-600 transition-all duration-200">
                    <Icon className="text-5xl md:text-8xl" icon="material-symbols:admin-panel-settings-rounded" />
                    <h2 className="texl-lg md:text-xl font-semibold select-none">Admin</h2>
                  </div>
                </label>
              </div>
            }
          </div>
          <div>
            {role === "seller" ?
              <Link href="/seller/register">
                <button className="bg-blue-600 select-none w-40 p-2 font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200">
                  Continue
                </button>
              </Link>
              :
              <button onClick={() => setStep(2)} className="bg-blue-600 select-none w-40 p-2 font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200">
                Continue
              </button>
            }
          </div>
        </div>
      </motion.div>
    </main>
  )
}

function Register() {
  const router = useRouter()
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)
  const [formData, setFormData] = useState<UserRegistration>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [fieldErrors, setFieldErrors] = useState<Partial<UserRegistration>>({})
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
    setErrorMessage("")
    setFieldErrors({})
    console.log(formData);

    const result = await registerAction(formData)
    if (!result?.success) {
      setFieldErrors(result?.errors)
      setErrorMessage(result?.message)
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
              <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 rounded p-2 w-full outline-0 focus:border-white" type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" autoComplete="new-password" required />
              <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
            </div>
            {fieldErrors?.confirmPassword && <span className="mt-1 text-xs text-red-500">{fieldErrors?.confirmPassword}</span>}
          </div>

          <AnimatePresence>
            {!!errorMessage &&
              <motion.div exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
                <p className="text-xs text-red-500">{errorMessage}</p>
              </motion.div>
            }
          </AnimatePresence>

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

export default function page({ admin }: { admin: boolean }) {
  const [step, setStep] = useState(1)
  switch (step) {
    case 1: return <Role admin={admin} setStep={setStep} />
    case 2: return <Register />
  }
}
