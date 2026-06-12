"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Onboarding, { OnboardingProgress } from "@/components/seller/Onboarding"
import { useOnboardingStore } from "@/store/seller/onboarding"
import Bank from "@/components/seller/onboarding/Bank"
import Business from "@/components/seller/onboarding/Business"
import Verification from "@/components/seller/onboarding/Verification"
import Setup from "@/components/seller/onboarding/Setup"
import { Icon } from "@iconify/react"

export default function page() {
  const { step, active, page, setStep, togglePage } = useOnboardingStore()
  const pages = [Business, Bank, Verification, Setup]
  const names = ["Business Details", "Bank Details", "Verification", "Setup Store"]
  const Page = pages[step]
  return (
    <div className="w-full lg:flex lg:justify-center lg:items-center lg:h-dvh">
      {active ?
        <div className="relative bg-neutral-800 h-dvh lg:max-w-[80dvw] lg:w-200 lg:h-100 lg:rounded-xl">
          <div className="flex justify-between items-center p-5 h-12 border-b border-white/20">
            <button onClick={() => togglePage()} className="cursor-pointer">
              <Icon fontSize={20} icon="line-md:arrow-left" />
            </button>
            <h1 className="font-semibold">{names[step]}</h1>
            <p className="text-sm">{step + 1}{" of "}{pages.length}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 gap-5">
            <OnboardingProgress pos="x" />
            <Page />
          </div>
        </div>
        :
        <Onboarding />
      }
    </div>

  )
}

