"use client"

import Image from "next/image"
import { Icon } from "@iconify/react"
import CartChecklist from "@/assets/cart_checklist.png"
import { useOnboardingStore } from "@/store/seller/onboarding"

export function OnboardingProgress({ pos = "y" }: { pos?: "x" | "y" }) {
  const { pages, step, setStep, togglePage } = useOnboardingStore()

  type PageId = "business" | "bank" | "verification" | "setup"

  const steps = [
    {
      id: "business",
      title: "Business Details",
      icon: "ic:round-business",
      desc: "Tell us about your business",
    },
    {
      id: "bank",
      title: "Bank Details",
      icon: "mdi:bank",
      desc: "Add your bank account details",
    },
    {
      id: "verification",
      title: "Verification",
      icon: "ic:baseline-verified-user",
      desc: "Upload required documents",
    },

    {
      id: "setup",
      title: "Shop Setup",
      icon: "mdi:store-edit",
      desc: "Customise your store profile",
    },
  ]

  return (
    <div className={`flex ${pos === "y" && "flex-col"}`}>
      {
        steps.map((item, index) => (
          <div key={index}>

            {pos === "y" &&
              <div className="flex flex-col">
                <div onClick={() => {
                  togglePage()
                  setStep(index)
                }} className={`flex cursor-pointer select-none border-3 ${pages[item.id as PageId] ? "bg-green-600/80" : "bg-neutral-700"} ${step === index ? "border-yellow-500" : "border-transparent"} items-center rounded-md p-2 gap-2`}>
                  <div className={`relative flex justify-center items-center w-10 h-10 rounded-full ${pages[item.id as PageId] ? "bg-green-800" : "bg-yellow-500"}`}>
                    <Icon fontSize={25} icon={pages[item.id as PageId] ? "material-symbols:check-rounded" : item.icon} />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{item.title}</h1>
                    <p className="text-sm">{item.desc}</p>
                  </div>
                </div>
                {index !== steps.length - 1 &&
                  <div className={`relative left-6 h-10 w-1 ${pages[item.id as PageId] ? "bg-green-800" : "bg-white/20"}`}></div>
                }

              </div>
            }

            {pos === "x" &&
              <div className="flex items-center">
                <div onClick={() => setStep(index)} className={`relative flex justify-center items-center w-10 h-10 rounded-full border-3 ${pages[item.id as PageId] ? "bg-green-600" : "bg-neutral-700"} ${step === index ? "border-green-400" : "border-transparent"}`}>
                  <Icon fontSize={25} icon={pages[item.id as PageId] ? "material-symbols:check-rounded" : item.icon} />
                </div>

                {index !== steps.length - 1 &&
                  <div className={`h-1 w-15 ${pages[item.id as PageId] ? "bg-green-600" : "bg-white/20"}`}></div>
                }
              </div>

            }
          </div>

        ))
      }

    </div>
  )
}

export default function page() {
  const { togglePage } = useOnboardingStore()
  return (
    <div className="flex justify-center lg:bg-neutral-800 lg:rounded-xl p-5">
      <div className="font-poppins flex flex-col gap-5">
        <div className="w-70">
          <h1 className="text-xl lg:text-2xl font-bold">Seller Onboarding</h1>
          <p className="text-sm">Complete these steps to set up your store and start selling.</p>
        </div>
        <div className="grid lg:grid-cols-2 lg:items-center gap-y-5">
          <OnboardingProgress pos="y" />
          <div className="hidden lg:flex lg:justify-start">
            <Image className="saturate-150" src={CartChecklist} alt="" />
          </div>
        </div>
        <div className="flex lg:w-1/2 gap-2 items-center bg-purple-800 rounded-md p-5">
          <div>
            <Icon fontSize={40} icon="mdi:shield-check-outline" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm lg:text-base font-bold">Your information is secure with us</h2>
            <p className="text-xs lg:text-sm">We use bank-level security to protect your data.</p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          <button onClick={() => togglePage()} className="p-2 w-full lg:w-1/2 bg-white text-black rounded-full font-semibold cursor-pointer">Continue</button>
        </div>
      </div>
    </div>
  )
}

