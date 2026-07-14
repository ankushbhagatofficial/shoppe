"use client"

import Loading from '@iconify-react/svg-spinners/ring-resize';
import ErrorMessage from "@/components/ui/validation/error"
import { Icon } from "@iconify/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import axios from 'axios';

type Variant = {
  id: string,
  images:
  {
    url?: string,
    publicId?: string,
    uploading: boolean,
    preview: string,
  }[],
  price: number,
  salePrice: number,
  stock: number,
  sku: string,
  color: string,
  optionType: string,
  optionValue: string
}

type Props = {
  index: number,
  variant: Variant,
  setVariant: Dispatch<SetStateAction<Variant>>,
  fieldErrors: Record<string, string | string[]> | undefined,
}

export default function ProductVariant({ index, fieldErrors, variant, setVariant }: Props) {
  const [imageError, setImageError] = useState("")
  const [expandImages, setExpandImages] = useState(index === 0)
  const OPTION_TYPES = [
    "Size",
    "Storage",
    "Memory",
    "Weight",
    "Volume",
    "Measure",
    "Capacity",
    "Material",
    "Custom",
  ]

  const uploadImage = async (file: File, index: number) => {
    try {
      const formData = new FormData()
      formData.append("image", file)
      const res = await axios.post("/api/seller/products/upload", formData)

      setVariant(prev => {
        const images = [...prev.images]
        images[index] = {
          ...images[index],
          url: res.data?.url,
          uploading: false
        }

        return {
          ...prev, images
        }
      })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data)
      }
    }
  }

  const handleImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    if (files.length > 0) {
      const newImages = files.slice(0, 10 - variant.images.length).map((file: File) => ({
        uploading: true,
        preview: URL.createObjectURL(file)
      }))

      setVariant({
        ...variant,
        images: [...variant.images, ...newImages]
      })

      try {
        await Promise.all(
          files.map((file, index) => uploadImage(file, variant.images.length + index))
        )
      } catch (error) {

      }

    }

    if (variant.images.length > 10) {
      return setImageError("You can upload a maximum of 10 images.")
    }
  }

  const changeImage = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    const images = [...variant.images];

    images[index] = {
      uploading: true,
      preview: URL.createObjectURL(file),
    };

    setVariant(prev => ({
      ...prev,
      images,
    }))

    await uploadImage(file, index)

    e.target.value = ""

  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target
    setVariant({
      ...variant,
      [name]: type === "checkbox" ? checked : value
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <button className="flex items-center" type="button">
          <label className="font-bold flex items-center gap-2 cursor-pointer">
            <input className="peer hidden"
              onChange={() => setExpandImages(!expandImages)}
              checked={expandImages}
              type="checkbox" />
            <Icon className={`transition-all duration-75 peer-checked:rotate-90`} fontSize={20} icon="line-md:chevron-small-right" />
            Product Images
          </label>
        </button>
        {expandImages &&
          <label className="">
            <input disabled={variant.images.length >= 10} onChange={handleImages} className="peer hidden w-full" multiple type="file" accept="image/*" />
            <div className={`h-50 border-dashed border-2 border-white/20 cursor-pointer rounded flex justify-center items-center peer-disabled:opacity-50 peer-disabled:cursor-not-allowed`}>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                  <Icon fontSize={50} icon="mdi:cloud-upload-outline" />
                  <p className="font-semibold">Drag and drop images</p>
                  <p className="font-semibold">or <span className="text-blue-500">browse</span></p>
                </div>
                <div className="flex flex-col text-xs text-white/60 justify-center items-center">
                  <p>Recommened Size: 800x800</p>
                  {imageError ?
                    <ErrorMessage message={imageError} />
                    :
                    <p>Max 10 Images</p>
                  }
                </div>
              </div>
            </div>
          </label>
        }
        {expandImages && variant.images.length > 0 &&
          <div className="flex w-full py-4 overflow-x-auto gap-4">
            {variant.images.slice(0, 10).map((image, index) => (
              <div key={index} className="relative select-none shrink-0 flex w-30 h-30 bg-neutral-700 rounded">
                <Icon onClick={() => {
                  setVariant({
                    ...variant,
                    images: variant.images.filter((_, i) => i !== index),
                  });
                }}
                  className="absolute z-15 -right-2 -top-2 bg-neutral-700 hover:bg-neutral-900 p-0.5 rounded-full"
                  fontSize={20} icon="mdi:remove" />

                {image.uploading &&
                  <div className="absolute rounded flex justify-center items-center w-full h-full backdrop-blur-xs">
                    <Loading height="2.5em" />
                  </div>
                }

                <label className="cursor-pointer rounded overflow-hidden">
                  <input onChange={(e) => changeImage(e, index)} className="hidden w-full" type="file" accept="image/*" />
                  <img className="object-contain h-full w-full" src={image.preview} />
                </label>
                <p className="absolute left-1 bottom-1 text-xs text-white/60">{index + 1}</p>
              </div>
            ))}

          </div>}
        <ErrorMessage message={fieldErrors?.images} />

      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-10">

        <div className="flex flex-col gap-4">
          <label className="font-bold flex gap-2 items-center">
            <Icon fontSize={20} className="text-green-400" icon="mdi:tag-outline" />
            Pricing
          </label>

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Price <span className="text-red-500">*</span></label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded px-1 h-10">
                <Icon fontSize={16} icon="material-symbols:currency-rupee-rounded" />
                <input onChange={handleOnChange} value={variant.price} min={49} className="outline-0 px-2 w-full text-sm" placeholder="Enter Price" type="number" name="price" required />
              </div>
              <ErrorMessage message={fieldErrors?.price} />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Sale Price</label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded px-1 h-10">
                <Icon fontSize={16} icon="material-symbols:currency-rupee-rounded" />
                <input onChange={handleOnChange} value={variant.salePrice} min={49} className="outline-0 px-2 w-full text-sm" placeholder="Enter Sale Price" type="number" name="salePrice" />
              </div>
              <ErrorMessage message={fieldErrors?.salePrice} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="font-bold flex gap-2 items-center">
            <Icon fontSize={20} className="text-blue-400" icon="mdi:cube-outline" />
            Inventory
          </label>

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">SKU <span className="text-red-500">*</span></label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded h-10">
                <input onChange={handleOnChange} value={variant.sku} className="no-spinner outline-0 px-2 w-full h-full text-sm" placeholder="Enter SKU" type="text" name="sku" required />
              </div>
              <ErrorMessage message={fieldErrors?.sku} />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Stock <span className="text-red-500">*</span></label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded h-10">
                <input onChange={handleOnChange} value={variant.stock} min={1} className="outline-0 px-2 w-full text-sm" placeholder="Available Stock" type="number" name="stock" required />
              </div>
              <ErrorMessage message={fieldErrors?.stock} />
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-4 md:flex-row md:gap-10">

        <div className="flex flex-col gap-4 w-full">
          <label className="font-bold flex gap-2 items-center">
            <Icon fontSize={20} icon="material-symbols:tune-rounded" />
            Options
          </label>

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm text-nowrap">Type</label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded pr-1 h-10 w-full">
                <select
                  onChange={(e) => setVariant({ ...variant, optionType: e.target.value, optionValue: "" })}
                  className="text-sm w-full px-2 py-2 outline-0 bg-neutral-800">
                  {
                    OPTION_TYPES.map((item, i) => (
                      <option key={i} value={item}>{item}</option>
                    ))
                  }
                </select>
              </div>
              <ErrorMessage message={fieldErrors?.optionType} />
            </div>

            {variant.optionType &&
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm text-nowrap">Value of {variant.optionType}</label>
                <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded h-10">
                  <input onChange={handleOnChange} value={variant.optionValue} className="outline-0 px-2 w-full h-full text-sm" placeholder={"Enter " + variant.optionType} type="string" name="optionValue" required />
                </div>
                <ErrorMessage message={fieldErrors?.optionValue} />
              </div>
            }
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-bold flex gap-2 items-center">
            <Icon fontSize={20} icon="material-symbols:style-outline" />
            Style
          </label>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-nowrap">Color</label>
            <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded h-10">
              <input onChange={handleOnChange} value={variant.color} className="outline-0 px-2 h-full w-full text-sm" placeholder="Enter Color Name" type="string" name="color" required />
            </div>
            <ErrorMessage message={fieldErrors?.color} />
          </div>
        </div>
      </div>

    </div>
  )
}

