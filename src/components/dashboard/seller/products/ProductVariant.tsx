"use client"

import RichTextEditor from "@/components/tiptap/RichTextEditor"
import { Icon } from "@iconify/react"
import { ChangeEvent, useState } from "react"

type Variant = {
  id: string,
  images:
  {
    preview: string,
    file: File | undefined
  }[],
  price: number,
  salePrice: number,
  stock: number,
  lowStock: number,
  sku: string,
  description: string,
}

export default function ProductVariant({ index, variant, setVariant }: { index: number, variant: Variant, setVariant: (variant: Variant) => void }) {
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[]>>()
  const [description, setDescription] = useState("")

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    if (files.length > 0) {
      const newImages = files.slice(0, 10 - variant.images.length).map((file: File) => ({
        file,
        preview: URL.createObjectURL(file)
      }))

      setVariant({
        ...variant,
        images: [...variant.images, ...newImages]
      }
      )
    }

    if (variant.images.length > 10) {
      return setFieldErrors(prev => ({
        ...prev,
        images: "You can upload a maximum of 10 images."
      }))
    }
  }

  const changeImage = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    const images = [...variant.images];

    images[index] = {
      file,
      preview: URL.createObjectURL(file),
    };

    setVariant({
      ...variant,
      images,
    })

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
        <label className="font-bold">Product Images</label>
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
                <p>Max 10 Images</p>
              </div>
            </div>
          </div>
        </label>
        {variant.images.length > 0 &&
          <div className="flex w-full py-4 overflow-x-auto gap-4">
            {variant.images.slice(0, 10).map((image, index) => (
              <div key={index} className="relative select-none shrink-0 flex w-30 h-30 bg-neutral-700 rounded">
                <Icon onClick={() => {
                  setVariant({
                    ...variant,
                    images: variant.images.filter((_, i) => i !== index),
                  });
                }}
                  className="absolute -right-2 -top-2 bg-neutral-700 hover:bg-neutral-900 p-0.5 rounded-full" fontSize={20} icon="mdi:remove" />
                <label className="cursor-pointer">
                  <input onChange={(e) => changeImage(e, index)} className="hidden w-full" type="file" accept="image/*" />
                  <img className="object-contain h-full w-full" src={image.preview} alt={image.file?.name} />
                </label>
                <p className="absolute left-1 bottom-1 text-xs text-white/60">{index + 1}</p>
              </div>
            ))}

          </div>}

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
              {fieldErrors?.price && <span className="mt-1 text-xs text-red-500">{fieldErrors?.price}</span>}
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Sale Price</label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded px-1 h-10">
                <Icon fontSize={16} icon="material-symbols:currency-rupee-rounded" />
                <input onChange={handleOnChange} value={variant.salePrice} min={49} className="outline-0 px-2 w-full text-sm" placeholder="Enter Sale Price" type="number" name="salePrice" />
              </div>
              {fieldErrors?.salePrice && <span className="mt-1 text-xs text-red-500">{fieldErrors?.salePrice}</span>}
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
              <label className="font-semibold text-sm">Stock <span className="text-red-500">*</span></label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded px-1 h-10">
                <input onChange={handleOnChange} value={variant.stock} min={1} className="outline-0 px-2 w-full text-sm" placeholder="Available Stock" type="number" name="stock" required />
              </div>
              {fieldErrors?.stock && <span className="mt-1 text-xs text-red-500">{fieldErrors?.stock}</span>}
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Low Stock Alert <span className="text-red-500">*</span></label>
              <div className="flex items-center border-2 border-white/20 focus-within:border-white/80 rounded px-1 h-10">
                <input onChange={handleOnChange} value={variant.lowStock} min={0} defaultValue={5} className="outline-0 px-2 w-full text-sm" placeholder="Enter MRP" type="number" name="lowStock" required />
              </div>
              {fieldErrors?.lowStock && <span className="mt-1 text-xs text-red-500">{fieldErrors?.lowStock}</span>}
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold flex gap-2 items-center">
          <Icon fontSize={20} className="text-yellow-400" icon="mdi:text" />
          Description
        </label>
        <RichTextEditor value={variant.description} onChange={(updated: string) => setVariant({ ...variant, description: updated })} />
        {fieldErrors?.description && <span className="mt-1 text-xs text-red-500">{fieldErrors?.description}</span>}
      </div>

    </div>
  )
}

