"use client"

import PaletteOutlineIcon from '@iconify-react/mdi/palette-outline';
import ColorizeIcon from '@iconify-react/mdi/colorize';
import { useRef } from 'react';

export default function HighlightModal({ editor, open, setOpen }: 
  { editor: any, open: boolean, setOpen: Function }) {
  const colorPickerRef = useRef<HTMLInputElement>(null)

  const highlightColors = [
    "#FACC15", // Yellow
    "#FB923C", // Orange
    "#F87171", // Red
    "#F472B6", // Pink
    "#C084FC", // Purple
    "#60A5FA", // Blue
    "#22D3EE", // Cyan
    "#4ADE80", // Green
    "#A3A3A3", // Gray
    "#FFFFFF", // White
  ]

  return (
    <div>
      {open &&
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bg-neutral-700 rounded-md w-max">
          <div className="grid grid-cols-4 rounded gap-2 p-5 w-fit">
            <button onClick={() => { editor.chain().focus().unsetHighlight().run(); setOpen(false) }} className="size-5 border-2 rounded cursor-pointer checkerboard" type="button"></button>
            {highlightColors.map(color => (
              <button key={color} type="button"
                onClick={() => { editor.chain().focus().setHighlight({ color }).run(); setOpen(false) }}
                className="size-5 border-2 rounded cursor-pointer" style={{ background: color }}>
              </button>
            ))
            }
            <div className="relative">
              <button type="button" onClick={() => colorPickerRef.current?.click()} className="w-5 h-5 bg-white/90 text-neutral-700 rounded cursor-pointer">
                <ColorizeIcon height="1.2em" />
              </button>
              <input ref={colorPickerRef} onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} className="opacity-0 absolute bottom-0" type="color" />
            </div>
          </div>
        </div>
      }

    </div>
  )
}


