import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";

export default function Bank() {
  const { nextStep, formData, setFormData } = useOnboardingStore()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      [name]: value
    })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    nextStep()
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Add your bank account details to receive payouts.</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Account Holder Name</label>
        <input onChange={handleOnChange} value={formData.accountHolder} maxLength={34} className="border-2 rounded-sm p-2 text-sm" type="text" name="accountHolder" placeholder="Enter account holer name" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Account Number</label>
        <input maxLength={20} onChange={handleOnChange} value={formData.accountNumber} required type="number" className="border-2 rounded-md p-2 text-sm" name="accountNumber" placeholder="Enter account number" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">IFSC Code</label>
        <input maxLength={12} onChange={handleOnChange} value={formData.ifscCode} required type="text" className="border-2 rounded-md p-2 text-sm" name="ifscCode" placeholder="Enter IFSC code" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Bank Name</label>
        <input maxLength={50} onChange={handleOnChange} value={formData.bankName} required type="text" className="border-2 rounded-md p-2 text-sm" name="bankName" placeholder="Enter Bank name" />
      </div>

      <div className="flex gap-2 items-center bg-green-800 rounded-md p-5">
        <div>
          <Icon fontSize={40} icon="material-symbols:lock-outline" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm lg:text-base font-bold">Your bank details are safe</h2>
          <p className="text-xs lg:text-sm">We use <b className="text-yellow-200">AES-256 bit</b> encryption to protect your information.</p>
        </div>
      </div>

      <button className="bg-white text-black p-2 font-semibold rounded-md cursor-pointer" type="submit">Continue</button>
    </form>
  )
}

