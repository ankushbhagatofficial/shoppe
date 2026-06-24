import { onboardingUploadAction } from "@/actions/onboarding";
import { useOnboardingStore } from "@/store/seller/onboarding";
import { toBase64 } from "@/utils/toBase64";
import { Icon } from "@iconify/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type Image = "panCard" | "identityCard" | "gstCertificate"

export default function Verification() {
  const { formData, setFormData, nextStep } = useOnboardingStore()
  const [error, setError] = useState<Record<string, string>>()

  const [loading, setLoading] = useState({
    panCard: false,
    identityCard: false,
    gstCertificate: false,
  })

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

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

      setFormData({
        files: {
          [name]: {
            name: image?.name,
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

  const validateForm = () => {
    const errors: {
      panCard?: string,
      identityCard?: string,
      gstCertificate?: string
    } = {}

    if (!formData.files.panCard?.url) {
      errors.panCard = "PAN Card is missing"
    }
    if (!formData.files.identityCard?.url) {
      errors.identityCard = "Identity Card is missing"
    }
    if (!formData.files.gstCertificate?.url) {
      errors.gstCertificate = "GST Certificate is missing"
    }

    return errors

  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = validateForm()
    setError(result)

    if (Object.keys(result).length === 0)
      nextStep()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-sm">Upload documents to verify your identity and business.</h2>
      {
        content.map(item => {
          const file = formData.files[item.name as Image]
          return (
            <div key={item.name}>


              <div className={`flex justify-between items-center p-5 gap-2 border rounded-md ${file?.status === true && "bg-green-600/20 border-green-400 border-2"}`}>
                <div className="flex gap-5">
                  <div className="flex justify-center items-center">
                    <Icon fontSize={30} icon="mdi:id-card-outline" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm">{item.label}</h2>
                    <div className="flex text-xs gap-1.5">

                      {error?.[item.name] &&
                        <div className="flex text-sm gap-1.5">
                          <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
                          <p className="text-red-400">{error?.[item.name]}</p>
                        </div>
                      }


                      {loading[item.name as Image] && <Icon icon="svg-spinners:270-ring" />}
                      {file?.status === true && <Icon className="text-green-400 mt-0.5" icon="material-symbols:check-circle-outline-rounded" />}
                      {typeof file?.status === "string" ?
                        <>
                          <Icon className="text-red-400" icon="material-symbols:cancel-rounded" />
                          <p className="text-red-400 text-xs">{file.status}</p>
                        </>
                        :
                        <p className={`${file?.status === true && "text-green-400"} w-fit line-clamp-1`}>
                          {file?.name ?
                            file?.name
                            :
                            item.desc
                          }
                        </p>
                      }
                    </div>
                  </div>
                </div>
                <label>
                  <input onChange={handleOnChange} className="hidden" type="file" name={item.name} accept=".jpg,.jpeg,.webp,.png,.avif" />
                  <div className={`p-1.5 px-3 text-sm font-semibold cursor-pointer rounded-sm bg-white/85 text-black`}>
                    {formData.files?.[item.name as Image]?.name ?
                      "Replace"
                      :
                      "Upload"

                    }
                  </div>
                </label>
              </div>
            </div>
          )
        })
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

