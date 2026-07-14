"use client"

import axios from "axios";
import { nanoid } from "nanoid"
import { Icon } from "@iconify/react"
import { useState, useEffect, ChangeEvent, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "motion/react";
import Toggle from "@/components/ui/toggle";
import ErrorMessage from "@/components/ui/validation/error";
import RichTextEditor from "@/components/tiptap/RichTextEditor";

type ProductData = {
  name: string,
  brand: string,
  category: string,
  tags: string[],
  shortDesc: string,
  description: string,
}

type Props = {
  next: Function,
  data: ProductData,
  setData: Dispatch<SetStateAction<ProductData>>
}

export default function Details({ next, data, setData }: Props) {
  const [categories, setCategories] = useState<string[]>([])
  const [showCategory, setShowCategory] = useState(false)
  const [cateorySearch, setCategorySearch] = useState("")
  const [category, setCategory] = useState(data.category)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[]>>()
  const filteredSearch = categories.filter(item => item.toLowerCase().includes(cateorySearch.toLowerCase()))

  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>(data.tags ?? [])
  const [cod, setCod] = useState(true)
  const [description, setDescription] = useState(data.description)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/categories")
      setCategories(res.data)
    }
    fetchData()

  }, [])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleShortDesc = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    setData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  function selectCategory(value: string) {
    setCategory(value);
    setCategorySearch("");
    setShowCategory(false);
  }

  function handleTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return

    e.preventDefault()
    setTags(prev => [...prev, tag])
    setTag("")
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)

    const formData = {
      ...data, tags, category, description, cod,
    }

    setData(formData)
    next()

    try {
      const res = await axios.post("/api/seller/products", formData)
      if (res.status === 200) {
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFieldErrors(error.response?.data?.errors ?? {})
        setError(error.response?.data?.message ?? "")
      }
    }
    setSubmit(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="product-details" className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label className="font-bold">Product Information</label>

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Product Name <span className="text-red-500">*</span></label>
              <input value={data.name} onChange={handleOnChange} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="Enter Product Name" type="text" name="name" required />
              <ErrorMessage message={fieldErrors?.name} />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Brand Name</label>
              <input value={data.brand} onChange={handleOnChange} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="Enter Brand Name" type="text" name="brand" />
              <ErrorMessage message={fieldErrors?.brand} />
            </div>
          </div>

          {showCategory &&
            <div className="flex flex-col gap-4 bg-neutral-700/50 w-full rounded-md p-5">
              <div>
                <input type="text" autoFocus
                  value={cateorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search category..."
                  className="w-full border rounded text-sm h-10 outline-0 px-3 py-1" />
              </div>

              <div className="flex flex-col h-52 border border-white/20 rounded p-2 overflow-y-auto">
                {filteredSearch.map((item, index) => (
                  <button key={index}
                    type="button"
                    onClick={() => selectCategory(item)}
                    className="text-left text-sm cursor-pointer rounded my-1 p-1 px-2 hover:bg-blue-500">{item}
                  </button>
                ))
                }
                {filteredSearch.length === 0 &&
                  <p className="text-sm font-semibold text-center">No Category Found</p>
                }
              </div>
            </div>
          }

          <div className="flex flex-col gap-4 md:flex-row md:gap-10">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Select Category <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-4">
                  <input value={category} onClick={() => setShowCategory(true)} readOnly className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" type="text" name="category" placeholder="Select Product Category" />
                </div>
                <ErrorMessage message={fieldErrors?.category} />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-sm">Tags</label>
              <input onChange={(e) => setTag(e.target.value)} onKeyDown={handleTag} placeholder="Add a tag (press Enter)" value={tag}
                className="rounded px-2 py-1 outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" type="text" name="tags" />
              <div className="flex gap-2 flex-wrap">
                {tags.map((item, index) => (
                  <span className="flex gap-2 text-sm rounded-full pl-3 p-0.5 bg-neutral-700" key={index}>{item}
                    <button
                      className="rounded-full bg-neutral-800/20 w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-neutral-800"
                      onClick={() => setTags(tags.filter((_, i) => i !== index))} type="button">
                      <Icon icon="mdi:remove" />
                    </button>
                  </span>
                ))}
              </div>
              <ErrorMessage message={fieldErrors?.tags} />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold text-sm">Short Description</label>
            <div className="relative">
              <textarea value={data.shortDesc} maxLength={200} onChange={handleShortDesc} rows={6} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm min-h-20 max-h-fit" placeholder="Briefly describe your product..." name="shortDesc" />
              <p className="absolute bottom-3 right-3 text-xs font-semibold">{"0/200"}</p>
            </div>
            <ErrorMessage message={fieldErrors?.shortDesc} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold flex gap-2 items-center">
            <Icon fontSize={20} className="text-yellow-400" icon="mdi:text" />
            Description
          </label>
          <RichTextEditor value={description} onChange={setDescription} />
          {fieldErrors?.description && <span className="mt-1 text-xs text-red-500">{fieldErrors?.description}</span>}
        </div>

        <div className="flex gap-2">
          <Toggle onChange={setCod} defaultChecked />
          <span className="text-sm font-semibold">Cash On Delivery</span>
        </div>

        {/* <div className="prose dark:prose-invert max-w-none" */}
        {/*   dangerouslySetInnerHTML={{ __html: description }} */}
        {/* /> */}

      </form >

    </div>
  )
}

