import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type Images = {
  pan: {
    name: string,
    loading: boolean,
  },

  identity: {
    name: string,
    loading: boolean,
  },

  gst: {
    name: string,
    loading: boolean,
  },

}

export default function Verification() {
  const { nextStep } = useOnboardingStore()
  const [images, setImages] = useState<Partial<Images>>({})
  const content = [
    {
      label: "PAN Card",
      name: "pan",
      desc: "Upload clear image of PAN Card"
    },
    {
      label: "Identity",
      name: "identity",
      desc: "Aadhaar Card, Passport or Voter ID"
    },
    {
      label: "GST Certificate (if applicable)",
      name: "gst",
      desc: "Upload your GST certificate"
    },

  ]

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Images
    const image = e.target.files?.[0]
    setImages(prev => ({
      ...prev, [name]: {
        ...prev[name],
        loading: true
      }
    }))
    console.log(images);

    if (!image) return

    try {
      setImages(prev => {
        return {
          ...prev,
          [name]: {
            name: image.name,
            loading: false,
            // src: URL.createObjectURL(image)
          }
        }
      })
    } catch (error) {

    }
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Upload documents to verify your identity and business.</h2>
      {
        content.map(item => (
          <div className={`flex justify-between items-center p-5 gap-2 border rounded-md ${images[item.name as keyof Images]?.name && "bg-green-600/20 border-green-400 border-2"}`}>
            <div className="flex gap-5">
              <div className="flex justify-center items-center">
                <Icon fontSize={30} icon="mdi:id-card-outline" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{item.label}</h2>
                <p className={`text-xs ${images.pan?.name && "text-green-400"}`}>
                  {images[item.name as keyof Images]?.name ?
                    "Image uploded successfully"
                    :
                   item.desc 
                  }
                </p>
              </div>
            </div>
            <label>
              <input onChange={handleOnChange} className="hidden" type="file" name={item.name} accept=".jpg,.jpeg,.webp,.png,.avif" />
              <div className={`p-1.5 px-3 text-sm font-semibold cursor-pointer rounded-sm bg-white/85 text-black`}>
                {images.pan?.name ?
                  "Replace"
                  :
                  "Upload"

                }
              </div>
            </label>
          </div>
        ))
      }

      <div className="flex gap-2 items-center bg-green-800 rounded-md p-5">
        <div>
          <Icon fontSize={40} icon="material-symbols:lock-outline" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm lg:text-base font-bold">Your documents are safe {"&"} secure with us</h2>
          <p className="text-xs lg:text-sm">They will only used for verification purposes.</p>
        </div>
      </div>

      <button className="bg-white text-black p-2 font-semibold rounded-md cursor-pointer" type="submit">Continue</button>
    </form>
  )
}

