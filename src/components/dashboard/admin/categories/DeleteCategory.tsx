"use client"

import axios from "axios"
import { Icon } from "@iconify/react"
import { SyntheticEvent, useState } from "react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { AnimatePresence, motion } from "motion/react"

type Category = {
  _id: string,
  name: string,
  slug: string,
  createdAt: Date,
  active: boolean,
  productCount: number
}

export default function DeleteCategory({ ids, onClose, onSuccess }: { ids: string[] | undefined, onClose: Function, onSuccess: Function }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setLoading(true)
    onSuccess(false)

    try {
      const res = await axios.delete("/api/admin/categories", { data: { ids } })
      if (res.status === 200) {
        onSuccess(true)
        alert("Category deleted successfully.")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message ?? "")
      }
    }
    setLoading(false)
    onClose()
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-lg">Delete Category</h1>
        </div>
        <button onClick={() => onClose()} className='cursor-pointer opacity-50' type='button'>
          <Icon fontSize={25} icon="mdi:remove" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-white">Are you sure you want to delete?</p>

        <AnimatePresence>
          {error &&
            <motion.div exit={{ opacity: 0, scale: 0 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
              <p className="text-xs text-red-500">{error}</p>
            </motion.div>
          }
        </AnimatePresence>

        <div className="flex gap-4">
          <button onClick={() => onClose()} className="font-semibold cursor-pointer p-2 px-4 bg-white text-black rounded" type="button">Cancel</button>
          <button onClick={() => handleDelete()} className="flex h-10 items-center justify-center gap-2 font-semibold cursor-pointer p-2 px-4 bg-red-500 rounded" type="button">
            Delete {loading && <Loading className="h-[60%] w-fit" />}
          </button>
        </div>
      </div>

    </div>
  )
}

