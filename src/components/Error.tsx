"use client"
import { Icon } from "@iconify/react";

export default function Error({ title = "Internal Server Error Occured!" }: { title?: string }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Icon className="text-yellow-500" fontSize={100} icon="ic:round-warning" />
      <h1 className="text-xl font-bold leading-4">{title}</h1>
      <div className="flex flex-col items-center text-sm gap-2">
        <p>Oops! Something went wrong.</p>
        <p className="text-center">The server encountered an internal error or misconfiguration and was unable to complete your request.</p>
        <p><span className="font-semibold">Error Code: </span><span>500</span></p>
      </div>
    </div>
  )
}

