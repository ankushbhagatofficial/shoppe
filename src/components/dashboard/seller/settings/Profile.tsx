"use client"

import Loading from '@iconify-react/svg-spinners/ring-resize';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { Icon } from "@iconify/react";
import axios from "axios";
import { toBase64 } from "@/utils/toBase64";
import { AnimatePresence, motion } from "motion/react";
import Toast from '@/components/ui/toast';

export default function Profile({ seller }: { seller: any }) {
  const [data, setData] = useState<Partial<any>>(seller)
  const [submit, setSubmit] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState<Record<string, string>>()
  const [toast, setToast] = useState(false)
  const [showToast, setShowToast] = useState({
    type: "success" as "success" | "error" | "info",
    message: ""
  })
  const [loading, setLoading] = useState({
    logo: false,
    banner: false,
  })

  useEffect(() => {
    setData(seller)
  }, [seller])

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0]

    if (file) {
      setLoading(prev => ({
        ...prev, [name]: true
      }))
      const image = await toBase64(file)

      setData(prev => ({
        ...prev, store: {
          ...prev.store,
          [name]: {
            url: image
          }
        }
      }))

      const formData = new FormData()
      formData.append("image", file)
      formData.append("type", name)

      try {
        const res = await axios.patch("/api/seller/settings/profile/image", formData)
        if (res.status === 200) {
          const { url } = res.data

          setData(prev => ({
            ...prev, store: {
              ...prev.store,
              [name]: { url }
            }
          }))

          setToast(true)
          setShowToast({
            type: "success",
            message: `${name} has been updated!`
          })

        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (typeof error.response?.data.message === "string") {

            setToast(true)
            setShowToast({
              type: "error",
              message: error.response?.data.message
            })

          }
        }
      }
    }

    setLoading(prev => ({
      ...prev, [name]: false
    }))
  }

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, id, value } = e.target
    if (id)
      setData(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          [name]: value
        }
      }))
    else
      setData(prev => ({
        ...prev,
        [name]: value
      }))
  }

  const handleStoreURL = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    setData(prev => ({
      ...prev,
      store: {
        ...prev.store, url
      }
    }))

  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({})
    setSubmit(true)
    setUpdated(false)
    console.table(data);
    try {
      const res = await axios.post("/api/update/seller/profile", data)
      if (res.status === 200) {
        setUpdated(true)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.errors)
      }
    }
    setSubmit(false)
  }

  return (
    <div className="relative flex flex-col gap-5">

      <Toast open={toast} onClose={() => setToast(false)} type={showToast.type} title={showToast.type} message={showToast.message} />

      {updated && <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        className="absolute z-20 rounded-md w-full h-full backdrop-blur-xl"></motion.div>
      }

      <AnimatePresence>
        {updated &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="sticky z-20 top-1/2">
            <div className='absolute left-1/2 top-1/2 -translate-1/2'>
              <div className="flex flex-col justify-center w-[90%] items-center m-10 p-10 bg-neutral-700 rounded-md gap-4">
                <DotLottieReact className="w-40" src="https://lottie.host/ec51bba0-50cf-4b58-9a7a-dbf78f736d90/xBTnXoiywq.lottie" autoplay />
                <h2 className="text-center text-lg leading-0 md:text-xl font-semibold font-poppins">Profile Updated!</h2>
                <p className="text-center text-balance text-xs md:text-sm">Your profile information has been updated successfully.</p>
                <button autoFocus onClick={() => setUpdated(false)} type="button" className="text-sm font-semibold p-2 rounded-md bg-green-500 w-1/2 cursor-pointer">Done</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div className="relative m-5 mb-20">
        <label className="relative block bg-neutral-900 border-white/50 border-2 rounded-xl h-40 md:h-60 overflow-hidden">
          <input onChange={handleImageChange} className="hidden" type="file" name="banner" id="store" />
          {
            loading.banner &&
            <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
              <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
            </div>
          }
          {data.store?.banner?.url ?
            <img className="w-full h-full object-contain" src={data.store?.banner.url} />
            :
            <div className="flex flex-col justify-center items-center h-[80%]">
              <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
              <p className="text-sm font-semibold">Upload Logo</p>
            </div>
          }
        </label>
        <label className="absolute z-15 bg-neutral-900 -bottom-15 md:-bottom-25 left-1/2 -translate-x-1/2 w-30 h-30 md:w-50 md:h-50 rounded-full border-2 overflow-hidden">
          <input onChange={handleImageChange} className="hidden" type="file" name="logo" id="store" />
          {
            loading.logo &&
            <div className="z-12 absolute flex justify-center items-center h-full w-full backdrop-blur-xs">
              <Icon className="z-10 absolute" fontSize={50} icon="svg-spinners:270-ring" />
            </div>
          }
          {data.store?.logo?.url ?
            <img className="w-full h-full object-contain" src={data.store?.logo.url} />
            :
            <div className="flex flex-col justify-center items-center h-full">
              <Icon fontSize={25} icon="mdi:cloud-upload-outline" />
              <p className="text-sm font-semibold">Upload Logo</p>
            </div>
          }
        </label>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col m-5 gap-5">
        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Personal Details</span>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Full Name</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="name" defaultValue={data.name} />
            {error?.name && <p className="text-xs text-red-400">{error.name}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Business Details</span>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">GST Number (Optional)</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="gstNumber" id="business" defaultValue={data.business?.gstNumber} />
            {error?.gstNumber && <p className="text-xs text-red-400">{error.gstNumber}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Business Address</label>
            <textarea rows={6} className="w-full min-h-20 border-2 border-gray-400 outline-0 focus:border-white rounded-md p-2 text-sm" name="businessAddress" id="business" defaultValue={data.business?.businessAddress} />
            {error?.businessAddress && <p className="text-xs text-red-400">{error.businessAddress}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Store Details</span>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Store Name</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="name" id="store" defaultValue={data.store?.name} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center justify-between text-sm font-semibold text-white/60">Store URL
              {error?.storeURL && <p className="text-xs text-red-400">{error?.storeURL}</p>}

            </label>
            <div className="flex border-2 border-gray-400 text-xs h-10 outline-0 focus-within:border-white rounded-sm items-center pl-2">
              <span className="text-neutral-400/80 font-semibold">{window?.location.host}/store/</span>
              <input onChange={handleStoreURL} value={data.store?.url} required maxLength={30} className="py-2 pr-2 w-full outline-0" type="text" name="url" id="store" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Store Description</label>
            <textarea rows={6} className="w-full min-h-20 border-2 border-gray-400 outline-0 focus:border-white rounded-md p-2 text-sm" name="description" id="store" defaultValue={data.store?.description} />
          </div>

        </div>

        <button className="flex justify-center items-center text-sm bg-white text-black w-full p-2 h-10 font-semibold rounded-md cursor-pointer" type="submit">
          {submit ?
            <Loading className='h-full' />
            :
            <p>Save Changes</p>
          }
        </button>

      </form>
    </div>
  )
}



