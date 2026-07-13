"use client"

import axios from "axios"
import { Icon } from "@iconify/react"
import { SyntheticEvent, useState } from "react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { AnimatePresence, motion } from "motion/react"
import Toggle from "@/components/ui/toggle";

type Category = {
  _id: string,
  name: string,
  slug: string,
  createdAt: Date,
  active: boolean,
  productCount: number
}

export default function UpdateCategory({ category, onClose, onSuccess }: { category: Category | undefined, onClose: Function, onSuccess: Function }) {
  const [name, setName] = useState(category?.name)
  const [slug, setSlug] = useState(category?.slug)
  const [active, setActive] = useState(category?.active)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[]>>()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    onSuccess(false)
    console.log(name, slug, active);

    try {
      const res = await axios.patch("/api/admin/categories/" + category?._id, { category: name, slug, active })
      if (res.status === 200) {
        onSuccess(true)
        alert("Category updated successfully.")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFieldErrors(error.response?.data?.errors ?? {})
        setError(error.response?.data?.message ?? "")
      }
    }
    setSubmit(false)
    onClose()
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-lg">Update Category</h1>
        </div>
        <button onClick={() => onClose()} className='cursor-pointer opacity-50' type='button'>
          <Icon fontSize={25} icon="mdi:remove" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Category Name <span className="text-red-500">*</span></label>
          <input autoFocus defaultValue={category?.name} onChange={(e) => setName(e.target.value)} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="e.g. Electronics" type="text" name="name" required />
          <p className="text-xs text-white/60">This is the name that will displayed to users.</p>
          {fieldErrors?.category && <span className="mt-1 text-xs text-red-500">{fieldErrors?.category}</span>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Slug <span className="text-red-500">*</span></label>
          <input defaultValue={category?.slug} onChange={(e) => setSlug(e.target.value)} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="e.g. electronics" type="text" name="slug" required />
          <p className="text-xs text-white/60">URL-friendly version of the name. Lowercase letters, numbers and hyphens only.</p>
          {fieldErrors?.slug && <span className="mt-1 text-xs text-red-500">{fieldErrors?.slug}</span>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Status</label>
          <div className="flex gap-2 items-center">
            <Toggle onChange={setActive} defaultChecked={category?.active} />
            <span className="font-semibold text-sm">Active</span>
          </div>
          <p className="text-xs text-white/60">Inactive categories will not visible in the store.</p>
          {fieldErrors?.slug && <span className="mt-1 text-xs text-red-500">{fieldErrors?.slug}</span>}
        </div>

        <AnimatePresence>
          {error &&
            <motion.div exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
              <p className="text-xs text-red-500">{error}</p>
            </motion.div>
          }
        </AnimatePresence>

        <div className="flex gap-4 w-full justify-end select-none">
          <button onClick={() => onClose()} className="text-xs cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Cancel</button>
          <button className="text-xs flex gap-2 h-10 w-fit items-center justify-center cursor-pointer active:scale-95 duration-200 bg-blue-700 px-4 font-semibold rounded-md" type="submit">
            Update Category
            {submit &&
              <Loading className='h-[50%] w-fit' />
            }
          </button>
        </div>

      </form>
    </div>
  )
}

