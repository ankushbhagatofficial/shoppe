import { checkStoreURL, onboardingAction } from "@/actions/onboarding";
import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { redirect } from "next/navigation"
import { toBase64 } from "@/utils/toBase64";
import axios from "axios";

type Image = "logo" | "banner"

export default function Setup() {
  const { reset, resetErrors, errors, setErrors, setStep, pages, setPage, formData, setFormData } = useOnboardingStore()
  const [image, setImage] = useState({
    logo: formData.files.logo?.url,
    banner: formData.files.banner?.url
  })
  const [loading, setLoading] = useState({
    submit: false,
    logo: false,
    banner: false,
  })

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const image = e.target.files?.[0]
    if (image) {
      const file = await toBase64(image)

      setErrors({
        [name]: ""
      })

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


      const data = new FormData()
      data.append("image", image)
      data.append("type", name)

      try {
        const res = await axios.post("/api/auth/seller/upload", data)
        if (res.status === 200) {
          const { url } = res.data

          setFormData({
            files: {
              [name]: {
                ...useOnboardingStore.getState().formData.files[name as Image],
                status: true,
                url,
              }
            }
          })
        }
      } catch (error) {
        if (axios.isAxiosError(error))
          setFormData({
            files: {
              [name]: {
                ...useOnboardingStore.getState().formData.files[name as Image],
                status: error.response?.data?.message
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
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetErrors()

    const fieldToStep: Record<string, number> = {
      businessType: 0,
      gstNumber: 0,
      accountHolder: 1,
      accountNumber: 1,
      ifscCode: 1,
      bankName: 1,
      panCard: 2,
      identityCard: 2,
      gstCertificate: 2,
      logo: 3,
      banner: 3,
      storeName: 3,
      storeURL: 3,
      storeDescription: 3,
    }

    setLoading(prev => ({
      ...prev, submit: true
    }))

    const result = await onboardingAction(formData)
    if (result?.success) {
      reset()
      redirect("/dashboard/seller")
    } else {
      setLoading(prev => ({
        ...prev, submit: false
      }))
      const firstError = Object.keys(result?.errors)[0]
      setStep(fieldToStep[firstError])
      for (const key of Object.keys(result?.errors)) {
        const targetStep = fieldToStep[key]
        setPage({[Object.keys(pages)[targetStep]]: false})
      }
      setErrors(result?.errors)
    }


  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
      {loading?.submit && <div className="absolute z-50 left-1/2 top-1/2 -translate-1/2 w-[105%] h-[105%] backdrop-blur-md">
        <div className="p-5 flex flex-col justify-center items-center gap-10 h-full border rounded-xl">
          <h1 className="text-xl font-bold">Submitting your application</h1>
          <Icon fontSize={50} className="text-blue-500" icon="svg-spinners:270-ring-with-bg" />
        </div>
      </div>
      }
      <h2 className="text-sm">Customise your store profile.</h2>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Logo</h2>
          <label className="cursor-pointer">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="logo" />
            <div className="relative h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {
                loading.logo &&
                <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
                  <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
                </div>
              }
              {image.logo ?
                <img className="object-contain h-full w-full p-2" src={image.logo} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Logo</p>
                </div>
              }
            </div>
          </label>

          {errors?.logo &&
            <div className="flex text-xs gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{errors?.logo}</p>
            </div>
          }

          {formData.files.logo?.status === true &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-green-400" icon="material-symbols:check-circle-outline-rounded" />
              <p>Logo uploaded successfully.</p>
            </div>
          }

          {typeof formData.files.logo?.status === "string" &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{formData.files.logo?.status}</p>
            </div>
          }

          <p className="text-sm text-white/80">Recommended size: 512x512</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Store Banner</h2>
          <label className="cursor-pointer">
            <input onChange={handleImageChange} className="hidden" accept=".jpg,.jpeg,.webp,.png,.avif" type="file" name="banner" />
            <div className="relative h-40 rounded-md border-dashed border-2 border-white/60 flex flex-col justify-center items-center overflow-hidden">
              {
                loading.banner &&
                <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
                  <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
                </div>
              }
              {image.banner
                ?
                <img className="object-contain h-full w-full p-2"
                  src={image.banner} alt="" />
                :
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
                  <p className="text-sm font-semibold">Upload Banner</p>
                </div>
              }
            </div>
          </label>

          {errors?.banner &&
            <div className="flex text-xs gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{errors?.banner}</p>
            </div>
          }

          {formData.files.banner?.status === true &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-green-400" icon="material-symbols:check-circle-outline-rounded" />
              <p>Banner uploaded successfully.</p>
            </div>
          }

          {typeof formData.files.banner?.status === "string" &&
            <div className="flex text-sm items-center gap-1.5">
              <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
              <p className="text-red-400">{formData.files.banner?.status}</p>
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
          {errors?.storeURL && <p className="text-xs text-red-400">{errors?.storeURL}</p>}
        </label>
        <div className="flex border-2 rounded-sm items-center text-xs pl-2 h-10">
          <span className="text-neutral-400/80 font-semibold">{window.location.host}/store/</span>
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

