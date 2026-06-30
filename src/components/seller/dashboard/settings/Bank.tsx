"use client"

import Loading from '@iconify-react/svg-spinners/ring-resize';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { Icon } from "@iconify/react";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";

export default function Bank({ seller }: { seller: any }) {
  const [data, setData] = useState<Partial<any>>(seller)
  const [submit, setSubmit] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState<Record<string, string>>()

  useEffect(() => {
    setData(seller)
  }, [seller])

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

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    setUpdated(false)
    setError({})
    console.table(data);
    try {
      const res = await axios.post("/api/update/seller/bank", data)
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

      <AnimatePresence>
        {updated &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 rounded-md w-full h-full backdrop-blur-xl">
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-center items-center w-[80%] h-[80%] p-10 bg-neutral-700 rounded-md gap-4">
                <DotLottieReact className="w-40" src="https://lottie.host/ec51bba0-50cf-4b58-9a7a-dbf78f736d90/xBTnXoiywq.lottie" autoplay />
                <h2 className="text-center text-lg leading-0 md:text-xl font-semibold font-poppins">Bank Updated!</h2>
                <p className="text-center text-balance text-xs md:text-sm">Your bank information has been updated successfully.</p>
                <button onClick={() => setUpdated(false)} type="button" className="text-sm font-semibold p-2 rounded-md bg-green-500 w-1/2 cursor-pointer">Done</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col m-5 gap-5">
        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Bank Details</span>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Account Holder Name</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="accountHolder" id="bank" defaultValue={data.bank.accountHolder} />
            {error?.accountHolder && <p className="text-xs text-red-400">{error.accountHolder}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Account Number</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="accountNumber" id="bank" defaultValue={data.bank.accountNumber} />
            {error?.accountNumber && <p className="text-xs text-red-400">{error.accountNumber}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">IFSC Code</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="ifscCode" id="bank" defaultValue={data.bank.ifscCode} />
            {error?.ifscCode && <p className="text-xs text-red-400">{error.ifscCode}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Bank Name</label>
            <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white rounded-sm p-2 text-sm" type="text" name="bankName" id="bank" defaultValue={data.bank.bankName} />
            {error?.bankName && <p className="text-xs text-red-400">{error.bankName}</p>}
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

