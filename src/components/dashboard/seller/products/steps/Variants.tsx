"use client"

import axios from "axios";
import { nanoid } from "nanoid"
import { Icon } from "@iconify/react"
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductVariant from "../ProductVariant";

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
  sku: string,
  stock: number,
  color: string,
  optionType: string,
  optionValue: string
}

type FieldErrors = Record<string, string | string[]> & {
  variants: Record<string, string | string[]>[]
}

export default function Variants({prev, complete}: {prev: Function, complete: (v:boolean) => void}) {
  const emptyVariant: Variant = {
    id: nanoid(),
    images: [],
    price: 0,
    salePrice: 0,
    sku: "",
    stock: 0,
    color: "",
    optionType: "",
    optionValue: ""
  }

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>()
  const [variants, setVariants] = useState<Variant[]>([emptyVariant])
  const [expandVariant, setExpandVariant] = useState(emptyVariant.id)

  const handleVariantChange = (
    index: number,
    updater: Variant | ((prev: Variant) => Variant)) => {
    setVariants(prev =>
      prev.map((variant, i) => {
        if (i !== index) return variant
        return typeof updater === "function" ? updater(variant) : updater
      })
    )
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    complete(true)

  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="" id="product-variants">
        {variants.map((variant, index) => (
          <div key={index} className="flex flex-col ">
            {variants.length > 0 &&
              <div className="flex flex-col ">
                <div className="flex justify-between w-full gap-4 p-2 my-2 bg-neutral-700/50 rounded">
                  <button className="flex w-full items-center gap-2 cursor-pointer" onClick={() => setExpandVariant(variant.id)} type="button">
                    <Icon className={`transition-all duration-75 ${expandVariant === variant.id && "rotate-90"}`} fontSize={20} icon="line-md:chevron-small-right" />
                    <span className="font-bold text-nowrap">Variant  #{index + 1}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVariants(variants.filter((_, i) => i !== index))
                    }}
                    className="flex cursor-pointer p-2 px-3 gap-2 text-sm font-semibold items-center rounded bg-red-500" >
                    <Icon fontSize={16} icon="line-md:trash" />
                  </button>

                </div>

                {expandVariant === variant.id &&
                  <div className="my-4">
                    <ProductVariant
                      index={index}
                      variant={variant}
                      fieldErrors={fieldErrors?.variants?.[index]}
                      setVariant={(v) => handleVariantChange(index, v)} />
                  </div>
                }
              </div>
            }
          </div>
        ))}
      </form>

      <button
        onClick={() => {
          const newVariant = emptyVariant
          setVariants(prev => ([...prev, newVariant]))
          setExpandVariant(newVariant.id)
        }}
        className="flex mr-auto text-nowrap gap-1 leading-5 text-xs p-2 px-3 font-semibold bg-green-800 text-green-400 rounded-md cursor-pointer"
        type="button">
        <Icon fontSize={20} icon="material-symbols:add-rounded" />
        Add Variant
      </button>

    </div>
  )
}

