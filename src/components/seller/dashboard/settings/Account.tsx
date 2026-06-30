"use client"

import Loading from '@iconify-react/svg-spinners/ring-resize';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Account({ seller }: { seller: any }) {
  const router = useRouter()
  const [data, setData] = useState<Partial<any>>(seller)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailSubmit, setEmailSubmit] = useState(false)
  const [passwordSubmit, setPasswordSubmit] = useState(false)
  const [emailUpdated, setEmailUpdated] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleteText, setDeleteText] = useState("")
  const [deleteAccount, setDeleteAccount] = useState(false)

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


  const updateEmail = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailError("")
    setEmailSubmit(true)
    setEmailUpdated(false)
    try {
      const res = await axios.post("/api/update/seller/email", data)
      if (res.status === 200) {
        setEmailUpdated(true)
        console.log("Email Updated")
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setEmailError(error.response?.data.message)
      }
    }

    setEmailSubmit(false)
  }

  const updatePassword = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSubmit(true)
    setPasswordUpdated(false)
    try {
      const res = await axios.post("/api/update/seller/password", data)
      if (res.status === 200) {
        setPasswordUpdated(true)
        e.currentTarget.reset()
        console.log("Password Updated")
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPasswordError(error.response?.data.message)
      }
    }

    setPasswordSubmit(false)
  }

  const handleDeleteAccount = async () => {
    setDeleteAccount(true)
    try {
      const res = await axios.delete("/api/delete/seller")
      if (res.status === 200) router.replace("/") 
    } catch (error) {

    }
    setDeleteAccount(false)    
  }

  return (
    <div className="relative flex flex-col gap-5">
      {(emailUpdated || passwordUpdated || showModal) && <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute z-20 bottom-0 rounded-md w-full h-full backdrop-blur-xl">
      </motion.div>}

      <AnimatePresence>
        {emailUpdated &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute z-25 flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center w-[80%] h-[80%] p-10 bg-neutral-700 rounded-md gap-4">
              <DotLottieReact className="w-40" src="https://lottie.host/ec51bba0-50cf-4b58-9a7a-dbf78f736d90/xBTnXoiywq.lottie" autoplay />
              <h2 className="text-center text-lg leading-0 md:text-xl font-semibold font-poppins">Email Updated!</h2>
              <p className="text-center text-balance text-xs md:text-sm">Your email address has been updated successfully.</p>
              <button autoFocus onClick={() => setEmailUpdated(false)} type="button" className="text-sm font-semibold p-2 outline-0 rounded-md bg-green-500 w-1/2 cursor-pointer">Done</button>
            </div>
          </motion.div>
        }

        {passwordUpdated &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute z-25 flex justify-center items-center w-full h-full">
            <div className="flex flex-col justify-center items-center w-[80%] h-[80%] p-10 bg-neutral-700 rounded-md gap-4">
              <DotLottieReact className="w-40" src="https://lottie.host/ec51bba0-50cf-4b58-9a7a-dbf78f736d90/xBTnXoiywq.lottie" autoplay />
              <h2 className="text-center text-lg leading-0 md:text-xl font-semibold font-poppins">Password Updated!</h2>
              <p className="text-center text-balance text-xs md:text-sm">Your password has been changed successfully.</p>
              <button onClick={() => setPasswordUpdated(false)} type="button" className="text-sm font-semibold p-2 outline-0 rounded-md bg-green-500 w-1/2 cursor-pointer">Done</button>
            </div>
          </motion.div>
        }

        {showModal &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute z-25 flex justify-center items-center w-full h-full">
            <div className="relative flex flex-col justify-center sm:items-center w-[95%] p-10 bg-red-800 rounded-md gap-4">
              <button onClick={() => { setShowModal(false); setDeleteText("") }} className='cursor-pointer absolute top-2 right-2 opacity-50' type='button'>
                <Icon fontSize={25} icon="mdi:remove" />
              </button>
              <h2 className="text-lg md:text-xl font-semibold font-poppins">Are you sure?</h2>
              <div className='flex flex-col gap-2 w-full sm:w-1/2'>
                <p className="text-balance font-semibold text-xs md:text-sm">The following will be permanently removed:</p>
                <ul className='list-disc ml-4 text-xs md:text-sm'>
                  <li>Your seller dashboard</li>
                  <li>Your store and store information</li>
                  <li>Product listings</li>
                  <li>Store logo and uploaded files</li>
                  <li>Payout/bank information</li>
                  <li>Store settings</li>
                  <li>Any other seller-related data</li>
                </ul>
              </div>

              <div className='flex flex-col align-baseline gap-2 w-full sm:w-1/2'>
                <label className='text-sm font-semibold'>Type <span className='bg-black p-0.5'>DELETE</span> to confirm</label>
                <input onChange={(e) => setDeleteText(e.target.value)} className='font-bold border-2 border-red-400 outline-0 rounded p-2 w-full' type="text" placeholder='DELETE' />
                <button autoFocus disabled={deleteText !== "DELETE"}
                  className="flex justify-center items-center h-10 text-sm disabled:bg-gray-400 disabled:brightness-75 disabled:cursor-not-allowed font-semibold p-2 rounded-md bg-red-600 cursor-pointer"
                  onClick={handleDeleteAccount} type="button" >
                  {deleteAccount ?
                    <Loading className='h-full' />
                    :
                    "Delete Permanently"

                  }
                </button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div className="flex flex-col p-4 gap-4">
        <form onSubmit={updateEmail} className="flex flex-col gap-2">
          <span className="font-bold text-lg">Email</span>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/60">Email Address</label>
            <div className="flex gap-4">
              <input onChange={handleOnChange} className="border-2 border-gray-400 outline-0 focus:border-white w-full rounded-sm p-2 text-sm" type="text" name="email" defaultValue={data.email} />
              <button className="flex justify-center items-center text-nowrap bg-white text-black text-sm p-2 font-semibold min-w-16 h-10 rounded-md cursor-pointer" type="submit">
                {emailSubmit ?
                  <Loading className='h-full' />
                  :
                  <p>Update</p>
                }
              </button>
            </div>
            {emailError && <span className="mt-1 text-xs text-red-500">{emailError}</span>}
          </div>

        </form>

        <form onSubmit={updatePassword} className="flex flex-col gap-2">
          <span className="font-bold text-lg">Password</span>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-sm text-white/60">Current Password</label>
              <div className="relative">
                <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 rounded p-2 w-full outline-0 focus:border-white" type={showPassword ? "text" : "password"} name="currentPassword" placeholder="Enter current password" autoComplete="current-password" required />
                <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-sm text-white/60">New Password</label>
              <div className="relative">
                <input onChange={handleOnChange} className="text-sm border-2 border-gray-400 outline-0 focus:border-white rounded p-2 w-full" type={showPassword ? "text" : "password"} name="newPassword" placeholder="Enter new password" autoComplete="new-password" required />
                <Icon className="absolute cursor-pointer text-xl top-1/2 right-1 -translate-1/2" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} />
              </div>
            </div>
          </div>

          {passwordError && <span className="text-xs text-red-500">{passwordError}</span>}

          <button className="flex justify-center items-center mt-2 bg-white text-black text-sm w-full p-2 h-10 font-semibold rounded-md cursor-pointer" type="submit">
            {passwordSubmit ?
              <Loading className='h-full' />
              :
              <p>Update Password</p>
            }
          </button>

        </form>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <span className="font-bold text-lg mt-1">Delete Account</span>
            <p className='text-sm text-white/60'>Permanently delete your account and all associated data. This action cannot be undone.</p>
          </div>

          <button onClick={() => setShowModal(true)} className="flex justify-center items-center bg-red-700 text-sm w-full p-2 h-10 font-semibold rounded-md cursor-pointer" type="button">Delete Account</button>
        </div>
      </div>

    </div>
  )
}

