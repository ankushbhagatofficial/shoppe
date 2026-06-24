import { bankSchema } from "@/lib/zod/seller/onboarding.schema";
import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { motion } from "motion/react";
import Tooltip from "../ui/tooltip";

export default function Bank() {
  const { nextStep, formData, setFormData, setPage } = useOnboardingStore()
  const [error, setError] = useState<Record<string, string[]>>({})

  // setError({})

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "accountNumber" && (value.length > 18 || Number.isNaN(Number(value)))) return

    setFormData({
      [name]: value
    })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = bankSchema.safeParse(formData)
    const status = result.success
    setError(result.error?.flatten().fieldErrors ?? {})
    if (status)
      nextStep()
    else
      setPage({ bank: false })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Add your bank account details to receive payouts.</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Account Holder Name</label>
        <div className="relative">
          <input onChange={handleOnChange} value={formData.accountHolder} maxLength={50} className="w-full border-2 rounded-sm p-2 text-sm" type="text" name="accountHolder" placeholder="Enter account holer name" />
          {error?.accountHolder &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={error?.accountHolder[0]} />
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Account Number</label>
        <div className="relative">
          <input maxLength={18} onChange={handleOnChange} value={formData.accountNumber} required type="text" className="w-full border-2 no-spinner rounded-md p-2 text-sm" name="accountNumber" placeholder="Enter account number" />
          {error?.accountNumber &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={error?.accountNumber[0]} />
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">IFSC Code</label>
        <div className="relative">
          <input onChange={handleOnChange} value={formData.ifscCode} required type="text" className="w-full border-2 rounded-md p-2 text-sm" name="ifscCode" placeholder="Enter IFSC code" />
          {error?.ifscCode &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={error?.ifscCode[0]} />

          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Bank Name</label>
        <div className="relative">
          <input maxLength={50} onChange={handleOnChange} value={formData.bankName} required type="text" className="w-full border-2 rounded-md p-2 text-sm" name="bankName" placeholder="Enter Bank name" />
          {error?.bankName &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={error?.bankName[0]} />
          }
        </div>
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

