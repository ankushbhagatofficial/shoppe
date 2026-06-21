import { onboardingAction } from "@/actions/onboarding";
import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent } from "react";
import { redirect } from "next/navigation"

export default function Setup() {
  const { reset, nextStep, formData, setFormData, togglePage } = useOnboardingStore()

  const handleChar = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    setFormData({
      [target.name]: target.value
    })
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const image = e.target.files?.[0]
    if (image) {

      setFormData({
        [name]: {
          name: image?.name,
          blob: URL.createObjectURL(image)
        }

      })
      console.log(image);

    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await onboardingAction(formData)
    if (result?.success) {
      nextStep()
      togglePage()
      reset()
      redirect("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Customise your store profile.</h2>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Logo</h2>
          <label className="flex-1">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="storeLogo" />
            <div className="h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {formData?.storeLogo?.blob ?
                <img className="object-contain h-full w-full p-2"
                  src={formData.storeLogo.blob} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Logo</p>
                </div>
              }
            </div>
          </label>
          <p className="text-sm text-white/80">Recommended size: 512x512</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Banner</h2>
          <label className="flex-1">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="storeBanner" />
            <div className="h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {formData.storeBanner?.blob
                ?
                <img className="object-contain h-full w-full p-2"
                  src={formData.storeBanner.blob} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Banner</p>
                </div>
              }
            </div>
          </label>
          <p className="text-sm text-white/80">Recommended size: 1200x300px</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Store Name</label>
        <input onChange={handleOnChange} value={formData.storeName} required maxLength={30} className="border-2 rounded-sm p-2 text-sm" type="text" name="storeName" placeholder="Enter your store name" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Store URL</label>
        <div className="flex border-2 rounded-sm items-center text-sm px-2">
          <span className="text-neutral-400/80">{window.location.origin}/store/</span>
          <input onChange={(e) =>
            setFormData({
              [e.target.name]: e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
            })
          } value={formData.storeURL} required maxLength={30} className="py-2 w-full outline-0" type="text" name="storeURL" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Store Description</label>
        <div className="relative">
          <textarea required onChange={handleChar} value={formData.storeDescription} maxLength={500} rows={6} className="w-full min-h-20 border-2 rounded-md p-2 text-sm" name="storeDescription" placeholder="Tell customers about your store and products" />
          <p className="char text-sm absolute select-none cursor-default bottom-4 right-4">{formData.storeDescription?.length || 0}/500</p>
        </div>
      </div>

      <button className="bg-white text-black p-2 font-semibold rounded-md cursor-pointer" type="submit">Submit</button>

    </form>
  )
}

