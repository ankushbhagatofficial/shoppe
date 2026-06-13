import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { SyntheticEvent, useState } from "react";

export default function Business() {
  const { nextStep } = useOnboardingStore()

  const handleChar = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    nextStep()
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-sm font-semibold">Business Type</h2>
        <p className="text-xs">Select your business type</p>
      </div>
      <div className="grid grid-cols-2 gap-5 h-20">
        <label>
          <input defaultChecked className="hidden peer" type="radio" name="businessType" value="individual" />
          <div className="peer-checked:border-green-400 cursor-pointer border-2 border-transparent flex h-full flex-col justify-center items-center bg-neutral-700 rounded-md">
            <Icon fontSize={30} icon="material-symbols:person-rounded" />
            <p className="text-sm font-semibold">Individual</p>
          </div>
        </label>
        <label>
          <input className="hidden peer" type="radio" name="businessType" value="business" />
          <div className="peer-checked:border-green-400 cursor-pointer border-2 border-transparent flex h-full flex-col justify-center items-center bg-neutral-700 rounded-md">
            <Icon fontSize={30} icon="ic:round-business" />
            <p className="text-sm font-semibold">Company</p>
          </div>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">GST Number (Optional)</label>
        <input maxLength={15} className="border-2 rounded-sm p-2 text-sm" type="text" name="gstNumber" placeholder="Enter GST Number" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Business Address</label>
        <div className="relative">
          <textarea required onChange={handleChar} maxLength={200} rows={6} className="w-full min-h-20 border-2 rounded-md p-2 text-sm" name="businessAddress" placeholder="Enter your complete business address" />
          <p className="char text-sm absolute select-none cursor-default bottom-4 right-4">0/200</p>
        </div>
      </div>

      <button className="bg-white text-black p-2 font-semibold rounded-md cursor-pointer" type="submit">Continue</button>
    </form>
  )
}

