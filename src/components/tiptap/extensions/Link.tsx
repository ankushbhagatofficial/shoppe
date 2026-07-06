"use client"

export default function LinkModal({ editor, link, setLink, open, setOpen }: 
  { editor: any, link: string, setLink: Function, open: boolean, setOpen: Function }) {

  const handleLink = () => {
    console.log(editor.getAttributes('link').href);

    if (link)
      editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run()
    else
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

    setOpen(false)
    setLink("")
  }



  return (
    <div>
      {open &&
        <div className="absolute z-10 left-1/2 top-full -translate-x-1/2 bg-neutral-700 rounded-md">
          <div className="flex flex-col gap-4 p-5">
            <h1 className="font-bold">Insert Link</h1>

            <div>
              <input autoFocus onChange={(e) => setLink(e.target.value)} value={link} className="p-1 border-2 outline-0 rounded focus:border-blue-300" type="text" />
            </div>

            <div className="flex gap-4">
              <button onClick={() => {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                setOpen(false)
              }
              } type="button" className="cursor-pointer bg-white text-black p-1.5 px-3 text-sm font-semibold rounded">Reset</button>
              <button onClick={() => setOpen(false)} type="button" className="cursor-pointer bg-white text-black p-1.5 px-3 text-sm font-semibold rounded">Cancel</button>
              <button onClick={() => handleLink()} type="button" className="cursor-pointer bg-white text-black p-1.5 px-3 text-sm font-semibold rounded">Save</button>
            </div>

          </div>
        </div>
      }

    </div>
  )
}

