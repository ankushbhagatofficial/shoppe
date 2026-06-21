import { useOnboardingStore } from "@/store/seller/onboarding";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent } from "react";

type Image = "panCard" | "identityCard" | "gstCertificate"

export default function Verification() {
  const { formData, setFormData, nextStep } = useOnboardingStore()
  const content = [
    {
      label: "PAN Card",
      name: "panCard",
      desc: "Upload clear image of PAN Card"
    },
    {
      label: "Identity",
      name: "identityCard",
      desc: "Aadhaar Card, Passport or Voter ID"
    },
    {
      label: "GST Certificate (if applicable)",
      name: "gstCertificate",
      desc: "Upload your GST certificate"
    },

  ]

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const image = e.target.files?.[0]
    if (image)
      setFormData({
        [name]: {
          name: image.name,
          blob: URL.createObjectURL(image)
        }
      })
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
          <div key={item.name} className={`flex justify-between items-center p-5 gap-2 border rounded-md ${formData[item.name as Image]?.name && "bg-green-600/20 border-green-400 border-2"}`}>
            <div className="flex gap-5">
              <div className="flex justify-center items-center">
                <Icon fontSize={30} icon="mdi:id-card-outline" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{item.label}</h2>
                <p className={`text-xs ${formData[item.name as Image]?.name && "text-green-400"}`}>
                  {formData[item.name as Image]?.name ?
                    formData[item.name as Image].name
                    :
                    item.desc
                  }
                </p>
              </div>
            </div>
            <label>
              <input onChange={handleOnChange} className="hidden" type="file" name={item.name} accept=".jpg,.jpeg,.webp,.png,.avif" />
              <div className={`p-1.5 px-3 text-sm font-semibold cursor-pointer rounded-sm bg-white/85 text-black`}>
                {formData[item.name as Image]?.name ?
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

