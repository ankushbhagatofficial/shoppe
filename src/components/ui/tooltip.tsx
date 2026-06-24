"use client"

import { motion } from "motion/react"

export default function Tooltip({ message, className }: { message: string | string[], className?: string }) {
  return (
    <motion.div initial={{ scale: 0, opacity: 0, y:100 }} animate={{ scale: 1, opacity: 1, y:0 }} transition={{ duration: 0.2 }} className={`absolute font-semibold font-poppins flex items-center my-2 text-foreground text-[10px] p-2 bg-background bottom-full right-0 rounded-md after:absolute after:-bottom-1 after:right-4 after:border-background after:border-4 after:rotate-45 ${className}`}>
      <p>{message}</p>
    </motion.div>
  )
}

