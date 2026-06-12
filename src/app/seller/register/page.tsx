"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Benefits from "@/components/seller/Benefits"
import Register from "@/components/seller/Register"

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

