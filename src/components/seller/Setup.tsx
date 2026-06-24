import { checkStoreURL, onboardingAction, onboardingUploadAction } from "@/actions/onboarding";
import { OnboardingStore, useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { redirect } from "next/navigation"
import { toBase64 } from "@/utils/toBase64";

type Image = "storeLogo" | "storeBanner"

export default function Setup() {
  const { reset, nextStep, formData, setFormData, togglePage } = useOnboardingStore()
  const [image, setImage] = useState({
    storeLogo: formData.files.storeLogo?.url,
    storeBanner: formData.files.storeBanner?.url
  })
  const [error, setError] = useState<Record<string, string>>()
  const [loading, setLoading] = useState({
    submit: false,
    storeLogo: false,
    storeBanner: false,
  })

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const image = e.target.files?.[0]
    if (image) {
      const file = await toBase64(image)

      setError(prev => ({
        ...prev, [name]: ""
      }))

      setLoading(prev => ({
        ...prev,
        [name]: true
      }))

      setImage(prev => ({
        ...prev,
        [name]: file
      })
      )

      setFormData({
        files: {
          [name]: {
            name: image?.name,
            src: file,
            status: false,
          }
        }
      })

      try {
        const url = await onboardingUploadAction({ name: image.name, src: file })
        setFormData({
          files: {
            [name]: {
              ...useOnboardingStore.getState().formData.files[name as Image],
              status: true,
              url,
            }
          }
        })
      } catch (error) {
        if (error instanceof Error)
          setFormData({
            files: {
              [name]: {
                ...useOnboardingStore.getState().formData.files[name as Image],
                status: error.message
              }
            }
          })
      }

    }

    setLoading(prev => ({
      ...prev,
      [name]: false
    }))
  }

  const handleChar = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    setFormData({
      [target.name]: target.value
    })
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      [e.target.name]: e.target.value
    })
  }

  const handleStoreURL = async (e: ChangeEvent<HTMLInputElement>) => {

    const url = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")


    setFormData({
      [e.target.name]: url
    })

    const result = await checkStoreURL(url)
    setError(prev => ({
      ...prev, storeURL: result ? "already taken, try diffrent!" : ""
    }))

  }

  const validateForm = () => {
    const errors: {
      storeLogo?: string,
      storeBanner?: string,
    } = {}

    if (!formData.files.storeLogo?.url) {
      errors.storeLogo = "Store Logo is missing"
    }
    if (!formData.files.storeBanner?.url) {
      errors.storeBanner = "Store Banner is missing"
    }

    return errors

  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = validateForm()
    setError(result)

    if (Object.keys(result).length === 0) {
      setLoading(prev => ({
        ...prev, submit: true
      }))

      const result = await onboardingAction(formData)
      if (result?.success) {
        reset()
        nextStep()
        redirect("/dashboard/seller")
      }

    }

    setLoading(prev => ({
      ...prev, submit: false
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Customise your store profile.</h2>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Logo</h2>
          <label className="cursor-pointer">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="storeLogo" />
            <div className="relative h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {
                loading.storeLogo &&
                <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
                  <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
                </div>
              }
              {image.storeLogo ?
                <img className="object-contain h-full w-full p-2" src={image.storeLogo} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Logo</p>
                </div>
              }
            </div>
          </label>

          {error?.storeLogo &&
            <div className="flex text-xs gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{error?.storeLogo}</p>
            </div>
          }

          {formData.files.storeLogo?.status === true &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-green-400" icon="material-symbols:check-circle-outline-rounded" />
              <p>Logo uploaded successfully.</p>
            </div>
          }

          {typeof formData.files.storeLogo?.status === "string" &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{formData.files.storeLogo?.status}</p>
            </div>
          }

          <p className="text-sm text-white/80">Recommended size: 512x512</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Banner</h2>
          <label className="cursor-pointer">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="storeBanner" />
            <div className="relative h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {
                loading.storeBanner &&
                <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
                  <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
                </div>
              }
              {image.storeBanner
                ?
                <img className="object-contain h-full w-full p-2"
                  src={image.storeBanner} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Banner</p>
                </div>
              }
            </div>
          </label>

          {error?.storeBanner &&
            <div className="flex text-xs gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{error?.storeBanner}</p>
            </div>
          }

          {formData.files.storeBanner?.status === true &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-green-400" icon="material-symbols:check-circle-outline-rounded" />
              <p>Banner uploaded successfully.</p>
            </div>
          }

          {typeof formData.files.storeBanner?.status === "string" &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{formData.files.storeBanner?.status}</p>
            </div>
          }

          <p className="text-sm text-white/80">Recommended size: 1200x300px</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Store Name</label>
        <input onChange={handleOnChange} value={formData.storeName} required maxLength={30} className="border-2 rounded-sm p-2 text-sm" type="text" name="storeName" placeholder="Enter your store name" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center justify-between text-sm font-semibold">Store URL
          {error?.storeURL && <p className="text-xs text-red-400">{error?.storeURL}</p>}

        </label>
        <div className="flex border-2 rounded-sm items-center text-sm pl-2">
          <span className="text-neutral-400/80">{window.location.origin}/store/</span>
          <input onChange={handleStoreURL} value={formData.storeURL} required maxLength={30} className="py-2 pr-2 w-full outline-0" type="text" name="storeURL" />

        </div>

      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Store Description</label>
        <div className="relative">
          <textarea required onChange={handleChar} value={formData.storeDescription} maxLength={500} rows={6} className="w-full min-h-20 border-2 rounded-md p-2 text-sm" name="storeDescription" placeholder="Tell customers about your store and products" />
          <p className="char text-sm absolute select-none cursor-default bottom-4 right-4">{formData.storeDescription?.length || 0}/500</p>
        </div>
      </div>

      <button className="bg-white text-black h-10 p-2 font-semibold rounded-md cursor-pointer" type="submit">
        {loading.submit ?
          <Icon className="w-full h-full" icon="svg-spinners:270-ring" />
          :
          "Submit"
        }

      </button>

    </form>
  )
}

