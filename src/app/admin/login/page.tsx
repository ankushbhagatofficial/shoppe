"use client"

import axios from "axios"
import Image from "next/image"
import SecurityShield from "@/assets/security_shield_3d.png"
import { Icon } from "@iconify/react"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { AnimatePresence, motion } from "motion/react"
import { loginAction } from "@/actions/login"

export default function page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSubmit(true)
    const result = await loginAction(formData, "admin")
    if (!result.success) {
      setError(result.message)
    }

    setSubmit(false)
  }

  return (
    <div className="flex h-dvh justify-center items-center">
      <div className="flex w-220 max-w-[90dvw] rounded">
        <div className="hidden lg:flex flex-col items-center p-5">
          <div className="flex items-start gap-1">
            <Image className="" src="/logo.webp" alt="logo" width={48} height={48} />
            <div className="hidden min-[350px]:flex flex-col">
              <div>
                <span className="text-white shadow-amber-50 text-2xl font-bold font-nunito relative top-1">Shopp</span>
                <span className="text-orange-500 text-2xl font-bold font-nunito relative top-1">e</span>
              </div>
              <span className="text-orange-500 text-xs font-bold font-nunito">Admin</span>
            </div>
          </div>

          <div className="mb-10">
            <Image className="hue-rotate-130 saturate-200" src={SecurityShield} width={256} height={256} alt="" />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold font-poppins">Secure. Powerful. In Control.</h1>
              <p className="text-sm text-white/60">Access your dashboard and manage your store efficiently.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Icon className="text-orange-500" fontSize={25} icon="mdi:shield-check-outline" />
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold">Full System Access</h1>
                <p className="text-xs text-white/60">Manage everything with complete authority.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Icon className="text-orange-500" fontSize={25} icon="mdi:users-outline" />
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold">User & Role Management</h1>
                <p className="text-xs text-white/60">Add and manage team members seamlessly.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Icon className="text-orange-500" fontSize={25} icon="mdi:chart-line" />
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold">Real-time Insights</h1>
                <p className="text-xs text-white/60">Moniter performance and make data-driven decisions.</p>
              </div>
            </div>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-180 rounded-lg border-2 border-white/20 p-5 gap-4">
          <div className="flex flex-col items-center justify-center">
            <Image className="hue-rotate-130 saturate-200" src={SecurityShield} width={128} height={128} alt="" />
            <h1 className="text-xl md:text-2xl font-bold font-poppins">Welcome Back</h1>
            <p className="text-sm text-white/60">Login to your admin account.</p>
          </div>
          <hr className="w-full border border-white/20" />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Email Address <span className="text-red-500">*</span></label>
            <div className="flex px-2 items-center h-10 gap-2 border-2 border-white/20 focus-within:border-white/80 rounded">
              <Icon className="h-[60%] w-fit text-white/40" icon="mdi:email-outline" />
              <input onChange={handleOnChange} placeholder="Enter email address" className="text-sm w-full py-2 outline-0" type="email" name="email" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Password <span className="text-red-500">*</span></label>
            <div className="relative flex px-2 items-center h-10 gap-2 border-2 border-white/20 focus-within:border-white/80 rounded">
              <Icon className="h-[60%] w-fit text-white/40" icon="mdi:lock-outline" />
              <input onChange={handleOnChange} placeholder="Enter password" className="text-sm w-full py-2 outline-0" type={showPassword ? "text" : "password"} name="password" />
              <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
            </div>
          </div>

          <AnimatePresence>
            {error &&
              <motion.div exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
                <p className="text-xs text-red-500">{error}</p>
              </motion.div>
            }
          </AnimatePresence>

          <button className="p-2 h-10 flex justify-center rounded cursor-pointer font-semibold text-sm bg-orange-600">
            {submit ?
              <Loading className='h-full' />
              :
              "Login"
            }
          </button>

        </form>
      </div>
    </div>
  )
}


