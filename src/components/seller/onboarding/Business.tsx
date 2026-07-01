import Tooltip from "@/components/ui/tooltip";
import { businessSchema } from "@/lib/zod/seller/onboarding.schema";
import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent } from "react";

export default function Business() {
  const { nextStep, setPage, errors, setErrors, formData, setFormData } = useOnboardingStore()

  const handleChar = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    setFormData({
      [target.name]: target.value
    })
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      [name]: value
    })
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({
      gstNumber: "",
      businessAddress: ""
    })
    const result = businessSchema.safeParse(formData)
    const status = result.success
    setErrors(result.error?.flatten().fieldErrors ?? {})
    if (status)
      nextStep()
    else
      setPage({ business: false })
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-sm font-semibold">Business Type</h2>
        <p className="text-xs">Select your business type</p>
      </div>
      <div className="grid grid-cols-2 gap-5 h-20">
        <label>
          <input onChange={handleOnChange} defaultChecked={formData.businessType === "individual"} className="hidden peer" type="radio" name="businessType" value="individual" />
          <div className="peer-checked:border-green-400 cursor-pointer border-2 border-transparent flex h-full flex-col justify-center items-center bg-neutral-700 rounded-md">
            <Icon fontSize={30} icon="material-symbols:person-rounded" />
            <p className="text-sm font-semibold">Individual</p>
          </div>
        </label>
        <label>
          <input onChange={handleOnChange} defaultChecked={formData.businessType === "company"} className="hidden peer" type="radio" name="businessType" value="company" />
          <div className="peer-checked:border-green-400 cursor-pointer border-2 border-transparent flex h-full flex-col justify-center items-center bg-neutral-700 rounded-md">
            <Icon fontSize={30} icon="ic:round-business" />
            <p className="text-sm font-semibold">Company</p>
          </div>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">GST Number (Optional)</label>
        <div className="relative">
          <input onChange={handleOnChange} maxLength={15} value={formData.gstNumber} className="w-full border-2 rounded-sm p-2 text-sm" type="text" name="gstNumber" placeholder="Enter GST Number" />
          {errors?.gstNumber &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={errors?.gstNumber[0]} />
          }
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Business Address</label>
        <div className="relative">
          <p className="char text-sm absolute select-none cursor-default bottom-4 right-4">{formData.businessAddress?.length ?? 0}/200</p>
          <textarea required onChange={handleChar} value={formData.businessAddress} maxLength={200} rows={6} className="w-full min-h-20 border-2 rounded-md p-2 text-sm" name="businessAddress" placeholder="Enter your complete business address" />
          {errors?.businessAddress &&
            <Tooltip className="max-w-60 after:border-red-500 bg-red-500" message={errors?.businessAddress[0]} />
          }
        </div>
      </div>

      <button className="bg-white text-black p-2 font-semibold rounded-md cursor-pointer" type="submit">Continue</button>
    </form>
  )
}

