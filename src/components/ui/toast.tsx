"use client"

import { Icon } from "@iconify/react"
import { AnimatePresence, motion, progress } from "motion/react"
import { useEffect, useRef, useState } from "react"

const styles = {
  success: {
    icon: "mdi:check-circle",
    bg: "bg-green-700",
    progress: "bg-green-900",
    border: "border-green-500/50",
    iconColor: "text-green-500",
  },
  error: {
    icon: "mdi:close-circle",
    bg: "bg-red-700",
    progress: "bg-red-900",
    border: "border-red-500/50",
    iconColor: "text-red-500",
  },
  info: {
    icon: "mdi:information",
    bg: "bg-blue-700",
    progress: "bg-blue-900",
    border: "border-blue-500/50",
    iconColor: "text-blue-500",
  },
}

type Toast = {
  open: boolean,
  type?: keyof typeof styles,
  title?: string,
  message: string,
  duration?: number,
  className?: string,
  onClose?: Function
}

export default function Toast({ open = true, type = "success", title, message, duration = 5, className, onClose }: Toast) {
  const style = styles[type]
  title = title && title.charAt(0).toUpperCase() + title.slice(1)

  useEffect(() => {
    const timeout = ((duration + 1) * 1000)
    const timer = setTimeout(() => onClose?.(), timeout);
    return () => clearTimeout(timer)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open &&
        <motion.div
          exit={{ y: 50, opacity: 0 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.5 }}
          className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 min-w-[80%] lg:mx-40 lg:min-w-[50dvw]">
          <div className={`relative ${style.bg} ${style.border} min-w-[80%] border-2 py-2 px-4 rounded ${className}`}>
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ delay: 1, duration, ease: "linear" }}
              className={`absolute left-0 -bottom-1 rounded-full h-1 ${style.progress}`}>
            </motion.div>

            <button onClick={() => onClose?.()} className="absolute right-2 top-2" type="button">
              <Icon icon="mdi:remove" />
            </button>

            <div className="flex gap-2 items-center">
              <Icon className={`${style.iconColor} text-2xl`} icon={style.icon} />
              <div className="flex-1 flex flex-col">
                {title && <h2 className="font-bold text-xs">{title}</h2>}
                <p className="text-xs ">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      }

    </AnimatePresence>


  )
}
