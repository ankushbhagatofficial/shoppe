"use client"

import pixel10a from "@/assets/google_pixel_10a.png"
import appleairpods from "@/assets/apple_airpods-max_hero.webp"
import micamera from "@/assets/mi_security_camera.png"
import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import Image from "next/image"

export default function Hero() {
  return (
    <section>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="relative -z-1 bg-radial via-neutral-900 to-neutral-800 row-span-2 h-120 rounded-2xl overflow-hidden font-poppins">
          <div className="relative h-full w-full aspect-video">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }} className="absolute mx-5 my-3 z-10 top-0 select-none">
              <button className="flex gap-2 justify-center items-center text-yellow-300 p-1.5 border-2 rounded-full text-xs px-4 font-semibold" type="button">
                <span>
                  <Icon icon="mdi:stars" />
                </span>
                New Collection
              </button>
            </motion.div>
            <div className="absolute flex flex-col m-5 w-70 gap-4 z-10 bottom-2">
              <div>
                <motion.h2 initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="text-2xl md:text-4xl font-bold">Meet the New</motion.h2>
                <motion.h2 initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="text-2xl md:text-4xl font-bold from-purple-400 to-blue-300 bg-linear-to-r bg-clip-text text-transparent">Pixel Family</motion.h2>
              </div>
              <div className="flex flex-col gap-4 w-60">
                <motion.p initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.2 }} className="text-sm md:text-base">
                  Built for speed, powered by AI, designed for everyday life.
                </motion.p>
                <motion.a href="/product?seller=google&item=pixel%2010a" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 0.2 }} className="text-sm md:text-base w-50 font-semibold bg-linear-to-r from-purple-600 to-blue-600 rounded-full p-2 select-none text-center" type="button">Shop</motion.a>
                <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.2 }} className="flex gap-2 m-2 select-none">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">
                      <Icon fontSize={30} icon="material-symbols:delivery-truck-speed-rounded" />
                    </span>
                    <div className="text-sm">
                      <h3 className="font-bold">Free</h3>
                      <p className="text-xs font-semibold">Shipping</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">
                      <Icon fontSize={30} icon="material-symbols:shield-lock-rounded" />
                    </span>
                    <div className="text-sm">
                      <h3 className="font-bold">Secure</h3>
                      <p className="text-xs font-semibold">Checkout</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.2 }} className="overflow-hidden w-full h-full select-none">
              <Image loading="eager" className="relative -top-25 md:top-0 object-contain h-full w-full scale-120 -rotate-7 left-20 md:left-40" src={pixel10a} alt="logo" />
            </motion.div>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 lg:grid-rows-2 lg:grid-cols-1 h-60 lg:h-120 gap-6">
          <div className="bg-neutral-800 rounded-2xl flex justify-between">
            <div className="m-5 flex justify-between flex-col">
              <motion.h2 initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="text-xl font-semibold">
                Apple Airpods
              </motion.h2>
              <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
                <p className="font-semibold text-xs">Starts from <b className="text-orange-500">$200</b></p>
                <p className="font-semibold text-xs">Offer 20% off</p>
              </motion.div>
            </div>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="h-full p-5 select-none">
              <Image loading="eager" className="object-contain h-full w-full" src={appleairpods} alt="" />
            </motion.div>
          </div>
          <div className="bg-neutral-800 rounded-2xl flex justify-between">
            <div className="m-5 flex justify-between flex-col">
              <motion.h2 initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="text-xl font-semibold">
                Security Camera
              </motion.h2>
              <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }}>
                <p className="font-semibold text-xs">Starts from <b className="text-orange-500">$100</b></p>
                <p className="font-semibold text-xs">Offer 20% off</p>
              </motion.div>
            </div>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.2 }} className="h-full p-5 select-none">
              <Image className="object-contain h-full w-full" src={micamera} alt="" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

