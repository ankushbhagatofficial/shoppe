"use client"

import axios from "axios"
import { Icon } from "@iconify/react"
import { SyntheticEvent, useState } from "react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { AnimatePresence, motion } from "motion/react"
import Toggle from "@/components/ui/toggle";

export default function AddCategory({ onClose, onSuccess }: { onClose: Function, onSuccess: Function }) {
  const [category, setCategory] = useState("")
  const [slug, setSlug] = useState("")
  const [active, setActive] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[]>>()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    onSuccess(false)
    try {
      const res = await axios.post("/api/admin/categories", { category, slug, active })
      if (res.status === 200) {
        onSuccess(true)
        alert("Category created successfully.")
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
          <h1 className="font-bold text-lg">Add Category</h1>
        </div>
        <button onClick={() => onClose()} className='cursor-pointer opacity-50' type='button'>
          <Icon fontSize={25} icon="mdi:remove" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Category Name <span className="text-red-500">*</span></label>
          <input autoFocus onChange={(e) => setCategory(e.target.value)} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="e.g. Electronics" type="text" name="name" required />
          <p className="text-xs text-white/60">This is the name that will displayed to users.</p>
          {fieldErrors?.category && <span className="mt-1 text-xs text-red-500">{fieldErrors?.category}</span>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Slug <span className="text-red-500">*</span></label>
          <input onChange={(e) => setSlug(e.target.value)} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="e.g. electronics" type="text" name="slug" required />
          <p className="text-xs text-white/60">URL-friendly version of the name. Lowercase letters, numbers and hyphens only.</p>
          {fieldErrors?.slug && <span className="mt-1 text-xs text-red-500">{fieldErrors?.slug}</span>}
        </div>

        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold text-sm">Status</label>
          <div className="flex gap-2 items-center">
            <Toggle onChange={setActive} defaultChecked />
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
            Create Category
            {submit &&
              <Loading className='h-[50%] w-fit' />
            }
          </button>
        </div>

      </form>
    </div>
  )
}

