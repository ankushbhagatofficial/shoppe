"use client"

import { Icon } from "@iconify/react"
import axios from "axios";
import Error from "@/components/Error"
import SearchIcon from '@iconify-react/fa-solid/search';
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SellerType } from "@/lib/model/seller.model";
import { AnimatePresence, motion } from "motion/react";
import AddProduct from "@/components/seller/products/AddProduct";

export default function page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<Partial<SellerType>>({})
  const [productModal, setProductModal] = useState(false)
  const [error, setError] = useState("")
  const status = {
    pending: {
      title: "Pending",
      icon: "mdi:clock-outline",
      colors: "text-yellow-800 bg-yellow-300",
    },
    approved: {
      title: "Verified",
      icon: "material-symbols:verified-outline-rounded",
      colors: "text-green-800 bg-green-300",
    },
    rejected: {
      title: "Rejected",
      icon: "material-symbols:cancel-outline-rounded",
      colors: "text-red-800 bg-red-300",
    }
  }

  const currentStatus = status[data?.status as keyof typeof status]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get/seller")
        setData(res.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message)
        }
      }
    }

    fetchData()
  }, [])

  if (Object.keys(data).length === 0) return (
    <div className="flex h-[88dvh] justify-center items-center">
      {error ?
        <Error title={error} />
        :
        <Loading height="2.5em" />
      }
    </div>
  )

  if (data?.status !== "approved") return (
    <div className="flex h-[88dvh] justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-50 h-50 bg-neutral-700 rounded-full">
          <Icon className="absolute w-full h-full text-yellow-500" icon="glyphs:box-open-duo" />
          <Icon className="absolute text-white/80 bottom-0 left-0 w-[50%] h-[50%]" icon="ic:round-lock" />
        </div>
        <div>
          <h1 className="text-center text-lg md:text-xl font-bold text-balance">You can't manage products yet</h1>
          <p className="text-center text-xs font-semibold text-balance">Your account is not verified yet. Once your account is verified, you will be able to add, edit and manage your products.</p>
        </div>
        <div className={`w-fit p-1 px-3 flex items-center gap-1 text-xs rounded-full ${currentStatus.colors}`}>
          <Icon className='h-full w-full' icon={currentStatus.icon} />
          <p className="text-nowrap font-semibold">{"Verification Status: "}{currentStatus.title}</p>
        </div>
        <div className="">
          <Link className="flex gap-1 items-center font-poppins text-sm py-2 px-5 bg-green-700 rounded-full font-semibold" href="/dashboard/seller/settings?tab=account" >
            <Icon icon="mdi:shield-check-outline" />
            View Verification Status
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative flex flex-col gap-4 h-dvh">

      {productModal && <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        className="absolute z-20 rounded-md w-full h-full backdrop-blur-xl"></motion.div>
      }

      <AnimatePresence>
        {productModal &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='absolute z-20 left-1/2 top-1/2 -translate-1/2 p-5 w-[95%] h-[95%] bg-neutral-800 rounded-lg border border-white/20'>
            <AddProduct closeModal={() => setProductModal(false)} />
          </motion.div>
        }
      </AnimatePresence>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Products</h1>
          <p className="text-xs font-semibold">Manage and organize your products.</p>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div>
          <label className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" height="20" />
            <input placeholder="Search any product..." className="border-2 w-full h-full p-1 px-10 rounded-full" type="text" />
          </label>
        </div>
        <div>
          <button onClick={() => setProductModal(true)} className="rounded-full h-10 text-nowrap flex font-semibold text-sm items-center gap-1 cursor-pointer py-2 px-4 bg-blue-800" type="button">
            <Icon fontSize={20} icon="material-symbols:add-rounded" />
            Add Product
          </button>
        </div>
      </div>

    </div>
  )
}


