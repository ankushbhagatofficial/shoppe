"use client"

export default function Toggle({ defaultChecked = true, onChange }: { defaultChecked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <div>
      <label className="flex">
        <input type="checkbox" name="active" 
          onChange={(e) => onChange(e.target.checked)}
          defaultChecked={defaultChecked}
          className="hidden peer rounded outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" />
        <div
          className="relative p-0.5 transition-all duration-100 ease-linear flex items-center w-10 h-5 rounded-full bg-neutral-700 after:content-[''] after:size-4 after:left-0.6 after:bg-white after:rounded-full after:absolute peer-checked:after:translate-x-5 peer-checked:bg-blue-600 after:transition-all after:duration-100 after:ease-linear">
        </div>
      </label>
    </div>
  )
}

