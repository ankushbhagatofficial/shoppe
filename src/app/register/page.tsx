"use client"

import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { useState } from "react"
import Register from "../components/Register"

export default function page() {
  const router = useRouter()
  const [role, setRole] = useState("user")
  const [step, setStep] = useState(1)

  switch (step) {
    case 1: return (
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
                  <div className="flex flex-col justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-green-500 peer-checked:text-green-400 peer-checked:bg-green-800 peer-checked:border-3 peer-checked:border-green-500 transition-all duration-200">
                    <Icon className="text-5xl md:text-8xl" icon="boxicons:user-filled" />
                    <h2 className="text-lg md:text-xl font-semibold select-none">User</h2>
                  </div>
                </label>
              </div>

              <div className="flex flex-col">
                <label>
                  <input onChange={(e) => setRole(e.target.value)} className="hidden peer" type="radio" name="role" value="seller" />
                  <div className="flex flex-col justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-yellow-600 peer-checked:text-yellow-700 peer-checked:bg-yellow-400 peer-checked:border-3 peer-checked:border-yellow-600 transition-all duration-200">
                    <Icon className="text-5xl md:text-8xl" icon="material-symbols:store-rounded" />
                    <h2 className="text-lg md:text-xl font-semibold select-none">Seller</h2>
                  </div>
                </label>
              </div>

              <div className="flex flex-col">
                <label>
                  <input onChange={(e) => setRole(e.target.value)} className="hidden peer" type="radio" name="role" value="admin" />
                  <div className="flex flex-col justify-center items-center text-gray-300 bg-neutral-700 w-40 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-xl border-3 border-transparent hover:border-red-600 peer-checked:text-red-700 peer-checked:bg-red-400 peer-checked:border-3 peer-checked:border-red-600 transition-all duration-200">
                    <Icon className="text-5xl md:text-8xl" icon="material-symbols:admin-panel-settings-rounded" />
                    <h2 className="texl-lg md:text-xl font-semibold select-none">Admin</h2>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <button onClick={() => setStep(2)} className="bg-blue-600 select-none w-40 p-2 font-semibold rounded-full cursor-pointer border-2 border-transparent hover:bg-blue-800 hover:border-white active:bg-blue-800 active:border-white transition-all duration-200">
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    )
    case 2: return <Register role={role} />
  }
}

