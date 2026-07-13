"use client"

export default function ErrorMessage({ className, cond, message }: { className?: string, cond?: boolean, message?: string | string[] }) {
  return (
    cond || !!message && <span className={`leading-0 text-xs text-red-500 ${className}`}>{message}</span>
  )
}

