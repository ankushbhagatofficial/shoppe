"use client"

import axios from "axios";
import { nanoid } from "nanoid"
import { Icon } from "@iconify/react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Product from "./steps/ProductDetails";
import Variants from "./steps/ProductVariants";

export default function AddProduct({ id, closeModal, onSuccess }: { id: string, closeModal: Function, onSuccess: Function }) {
  type ProductData = {
    productName: string,
    brand: string,
    category: { name: string, id: string },
    tags: string[],
    shortDesc: string,
    description: string,
    cod: boolean,
    slug?: string,
  }

  type Variant = {
    id: string,
    slug?: string,
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

  const emptyProduct: ProductData = {
    productName: "",
    brand: "",
    category: { name: "", id: "" },
    tags: [],
    shortDesc: "",
    description: "",
    cod: true,
  }

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

  const [productData, setProductData] = useState(emptyProduct)
  const [productVariants, setProuctVariants] = useState<Variant[]>([emptyVariant])
  const [productSubmit, setProductSubmit] = useState(false)
  const [variantsSubmit, setVariantsSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [step, setStep] = useState(0)
  const next = () => setStep(1)
  const prev = () => setStep(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await axios.get("/api/seller/products/" + id)
      setProductData(res.data.product)
      if (res.data.variants.length > 0) {
        setProuctVariants(prev => ({
          ...prev, ...res.data.variants
        }))

      }
      setLoading(false)
    }
    if (id) fetchData()
  }, [])

  const steps = [
    <Product
      submit={productSubmit}
      setSubmit={setProductSubmit}
      next={next} data={productData}
      setData={setProductData} />,

    <Variants submit={variantsSubmit}
      slug={productData?.slug ?? ""}
      variants={productVariants}
      setVariants={setProuctVariants}
      emptyVariant={emptyVariant}
      complete={setComplete}
      onSuccess={onSuccess}
      closeModal={closeModal}
      setSubmit={setVariantsSubmit} />
  ]

  const ProductStep = steps[step]

  if (loading) return (
    <div className="h-full">
      <button onClick={() => closeModal()} className='float-right cursor-pointer opacity-50' type='button'>
        <Icon fontSize={25} icon="mdi:remove" />
      </button>
      <div className="flex justify-center items-center h-full">
        <Loading className='size-10' />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-lg">{id ? "Update" : "Add New"} Product</h1>
          {!id &&
            <p className="font-semibold text-xs w-[80%]">Fill in the details below to add new product to your store.</p>
          }
        </div>
        <button onClick={() => closeModal()} className='cursor-pointer opacity-50' type='button'>
          <Icon fontSize={25} icon="mdi:remove" />
        </button>
      </div>
      <hr className="border border-white/20" />
      <div className="flex justify-center items-center">
        <div className={`flex justify-center items-center size-10 rounded-full transition-all ${step > 0 ? "bg-green-600" : "bg-neutral-600"} border-2 ${step === 0 ? "border-green-600" : "border-transparent"}`}>
          <Icon fontSize={20} icon="material-symbols:inventory-2-outline-rounded" />
        </div>
        <div className={`h-1 bg-neutral-600 flex-[0.2] after:content-[] after:block after:transition-all after:h-1 after:bg-green-600 ${step > 0 ? "after:w-full" : "after:w-0"}`}></div>
        <div className={`flex justify-center items-center size-10 rounded-full transition-all ${complete && step > 0 ? "bg-green-600" : "bg-neutral-600"} border-2 ${step === 1 ? "border-green-600" : "border-transparent"}`}>
          <Icon fontSize={20} icon="material-symbols:add-notes-outline-rounded" />
        </div>
      </div>
      <div className="flex flex-col border border-white/20 rounded-lg p-5 gap-4 overflow-y-auto">
        {ProductStep}
      </div>
      {step === 0 &&
        <div className="flex flex-wrap gap-4 w-full md:justify-end select-none h-10">
          <button onClick={() => closeModal()} className="text-xs h-full text-nowrap cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Cancel</button>
          <button className="flex h-full justify-center items-center w-fit text-xs text-nowrap cursor-pointer active:scale-95 duration-200 bg-blue-700 px-4 font-semibold rounded-md" form="product-details" type="submit">
            {productSubmit ?
              <Loading className='h-[50%] w-fit' />
              :
              "Continue"
            }
          </button>
        </div>
      }
      {step === 1 &&
        <div className="flex flex-wrap gap-4 w-full md:justify-end select-none h-10">
          <button onClick={prev} className="text-xs text-nowrap cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Back</button>
          <button className="text-xs text-nowrap cursor-pointer active:scale-95 bg-yellow-400 text-black px-4 font-semibold rounded-md" form="product-variants" type="submit">Publish</button>
        </div>
      }
    </div >
  )
}

