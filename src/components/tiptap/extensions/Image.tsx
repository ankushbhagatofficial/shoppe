"use client"

import { useState } from "react"

export default function ImageModal({ editor, open, setOpen }:
  { editor: any, open: boolean, setOpen: Function }) {

  const [url, setUrl] = useState("")

  const insertImage = () => {
    try {
      const parsed = new URL(url);

      // Only allow http/https
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return false;
      }

      editor.chain().focus().setImage({ src: url }).run()

      setOpen(false)
      setUrl("")

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      {open &&

        <div className="absolute z-10 left-1/2 top-full -translate-x-1/2 bg-neutral-700 rounded-md">
          <div className="flex gap-2 p-5">
            <input autoFocus onChange={(e) => setUrl(e.target.value)} value={url} className="rounded outline-0 px-2 h-10 text-sm border-2 border-white/20 focus:border-white/80" type="text" placeholder="Enter Image URL" />
            <button type="button" onClick={() => insertImage()} className="cursor-pointer text-sm font-semibold px-4 bg-white text-black rounded">Insert</button>
          </div>
        </div>

      }
    </div>
  )
}

