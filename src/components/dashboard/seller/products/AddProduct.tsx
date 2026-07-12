"use client"

import axios from "axios";
import { nanoid } from "nanoid"
import { Icon } from "@iconify/react"
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductVariant from "./ProductVariant";
import Toggle from "@/components/ui/toggle";

export default function AddProduct({ closeModal }: { closeModal: Function }) {
  // const categories: string[] = [
  //   "Custom",
  //   "Electronics",
  //   "Mobiles",
  //   "Laptops",
  //   "Computers",
  //   "Computer Accessories",
  //   "Tablets",
  //   "Smart Watches",
  //   "Wearable Devices",
  //   "Audio",
  //   "Headphones",
  //   "Earbuds",
  //   "Speakers",
  //   "Cameras",
  //   "Camera Accessories",
  //   "Gaming",
  //   "Gaming Consoles",
  //   "Gaming Accessories",
  //   "Networking",
  //   "Storage Devices",
  //   "Printers",
  //   "Office Electronics",
  //   "TV & Entertainment",
  //   "Home Appliances",
  //   "Kitchen Appliances",
  //   "Large Appliances",
  //   "Small Appliances",
  //   "Furniture",
  //   "Home Decor",
  //   "Home Improvement",
  //   "Lighting",
  //   "Bathroom",
  //   "Kitchen & Dining",
  //   "Cookware",
  //   "Bakeware",
  //   "Storage & Organization",
  //   "Cleaning Supplies",
  //   "Garden",
  //   "Outdoor Living",
  //   "Tools & Hardware",
  //   "Fashion",
  //   "Men's Clothing",
  //   "Women's Clothing",
  //   "Kids' Clothing",
  //   "Baby Clothing",
  //   "Footwear",
  //   "Sports Shoes",
  //   "Casual Shoes",
  //   "Bags",
  //   "Wallets",
  //   "Luggage",
  //   "Jewellery",
  //   "Watches",
  //   "Sunglasses",
  //   "Beauty",
  //   "Skin Care",
  //   "Hair Care",
  //   "Makeup",
  //   "Perfumes",
  //   "Personal Care",
  //   "Health Care",
  //   "Medical Supplies",
  //   "Nutrition",
  //   "Vitamins",
  //   "Sports & Fitness",
  //   "Gym Equipment",
  //   "Yoga",
  //   "Cycling",
  //   "Running",
  //   "Camping",
  //   "Hiking",
  //   "Cricket",
  //   "Football",
  //   "Badminton",
  //   "Basketball",
  //   "Swimming",
  //   "Books",
  //   "Educational Books",
  //   "Comics",
  //   "Magazines",
  //   "Stationery",
  //   "Office Supplies",
  //   "School Supplies",
  //   "Art & Craft",
  //   "Toys",
  //   "Educational Toys",
  //   "Board Games",
  //   "Action Figures",
  //   "Baby Products",
  //   "Diapers",
  //   "Baby Care",
  //   "Pet Supplies",
  //   "Dog Supplies",
  //   "Cat Supplies",
  //   "Aquarium",
  //   "Bird Supplies",
  //   "Groceries",
  //   "Beverages",
  //   "Snacks",
  //   "Food Staples",
  //   "Organic Food",
  //   "Dairy",
  //   "Frozen Foods",
  //   "Automotive",
  //   "Car Accessories",
  //   "Motorcycle Accessories",
  //   "Car Care",
  //   "Tyres",
  //   "Industrial",
  //   "Scientific Supplies",
  //   "Safety Equipment",
  //   "Power Tools",
  //   "Hand Tools",
  //   "Electrical Supplies",
  //   "Building Materials",
  //   "Musical Instruments",
  //   "Musical Accessories",
  //   "Movies",
  //   "Music",
  //   "Video Games",
  //   "Collectibles",
  //   "Antiques",
  //   "Handmade",
  //   "Craft Supplies",
  //   "Party Supplies",
  //   "Gift Items",
  //   "Gift Cards",
  //   "Religious Items",
  //   "Seasonal Products",
  //   "Travel Accessories",
  //   "Smart Home",
  //   "Security Systems",
  //   "Solar Products",
  //   "Eco-Friendly Products",
  //   "Digital Products",
  //   "Software",
  //   "Phone Accessories",
  //   "Tablet Accessories",
  //   "Laptop Accessories",
  //   "Drone & Accessories",
  //   "3D Printers",
  //   "Virtual Reality",
  //   "Augmented Reality",
  //   "Photography",
  //   "Fishing",
  //   "Hunting",
  //   "Office Furniture",
  //   "Commercial Equipment",
  //   "Restaurant Supplies",
  //   "Salon Supplies",
  //   "Medical Equipment",
  //   "Laboratory Equipment",
  //   "Agriculture",
  //   "Seeds & Plants",
  //   "Livestock Supplies",
  // ]

  type Variant = {
    id: string,
    images:
    {
      preview: string,
      file: File | undefined
    }[],
    price: number,
    salePrice: number,
    sku: string,
    stock: number,
    lowStock: number,
    description: string,
  }

  const [categories, setCategories] = useState<string[]>([])
  const [showCategory, setShowCategory] = useState(false)
  const [cateorySearch, setCategorySearch] = useState("")
  const [category, setCategory] = useState("")
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | string[]>>()
  const filteredSearch = categories.filter(item => item.toLowerCase().includes(cateorySearch.toLowerCase()))

  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [cod, setCod] = useState(true)
  const [formData, setFormData] = useState({})
  const emptyVariant: Variant = {
    id: nanoid(),
    images: [],
    price: 0,
    salePrice: 0,
    sku: "",
    stock: 0,
    lowStock: 0,
    description: "",
  }
  const [variants, setVariants] = useState<Variant[]>([emptyVariant])
  const [expandVariant, setExpandVariant] = useState(emptyVariant.id)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/categories")
      setCategories(res.data)
    }
    fetchData()

  }, [])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleVariantChange = (index: number, updatedVariant: Variant) => {
    setVariants(prev =>
      prev.map((variant, i) =>
        i === index ? updatedVariant : variant
      )
    )
  }

  const handleShortDesc = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    setFormData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
    const sibling = target.nextElementSibling
    if (sibling) sibling.textContent = `${target.value.length}/${target.maxLength}`
  }

  function selectCategory(value: string) {
    setCategory(value);
    setCategorySearch("");
    setShowCategory(false);
  }

  function handleTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return

    e.preventDefault()
    setTags(prev => [...prev, tag])
    setTag("")
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmit(true)
    try {
      const res = await axios.post("/api/seller/products", {})
      if (res.status === 200) {
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFieldErrors(error.response?.data?.errors ?? {})
        setError(error.response?.data?.message ?? "")
      }
    }
    setSubmit(false)
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-lg">Add New Product</h1>
          <p className="font-semibold text-xs w-[80%]">Fill in the details below to add new product to your store.</p>
        </div>
        <button onClick={() => closeModal()} className='cursor-pointer opacity-50' type='button'>
          <Icon fontSize={25} icon="mdi:remove" />
        </button>
      </div>
      <hr className="border border-white/20" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col border border-white/20 rounded-lg p-5 gap-4 overflow-y-auto">

          <div className="flex flex-col gap-4">
            <label className="font-bold">Product Information</label>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Product Name <span className="text-red-500">*</span></label>
                <input className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="Enter Product Name" type="text" name="name" required />
                {fieldErrors?.name && <span className="mt-1 text-xs text-red-500">{fieldErrors?.name}</span>}
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Brand Name</label>
                <input className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" placeholder="Enter Brand Name" type="text" name="brand" />
                {fieldErrors?.brand && <span className="mt-1 text-xs text-red-500">{fieldErrors?.brand}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full gap-2">
                  <label className="font-semibold text-sm">Select Category <span className="text-red-500">*</span></label>
                  <div className="flex flex-col gap-4">
                    <input onClick={() => setShowCategory(true)} readOnly className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" value={category} type="text" name="category" placeholder="Select Product Category" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-sm">Tags</label>
                <input onChange={(e) => setTag(e.target.value)} onKeyDown={handleTag} placeholder="Type a tag" value={tag}
                  className="rounded px-3 py-1 outline-0 border-2 border-white/20 focus:border-white/80 text-sm h-10" type="text" name="tags" />
                <div className="flex gap-2 flex-wrap">
                  {tags.map((item, index) => (
                    <span className="flex gap-2 text-sm rounded-full pl-3 p-0.5 bg-neutral-700" key={index}>{item}
                      <button
                        className="rounded-full bg-neutral-800/20 w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-neutral-800"
                        onClick={() => setTags(tags.filter((_, i) => i !== index))} type="button">
                        <Icon icon="mdi:remove" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {showCategory &&
              <div className="flex flex-col gap-4 bg-neutral-700/50 w-full rounded-md p-5">
                <div>
                  <input type="text" autoFocus
                    value={cateorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search category..."
                    className="w-full border rounded text-sm h-10 outline-0 px-3 py-1" />
                </div>

                <div className="flex flex-col h-52 border border-white/20 rounded p-2 overflow-y-auto">
                  {filteredSearch.map((item, index) => (
                    <button key={index}
                      type="button"
                      onClick={() => selectCategory(item)}
                      className="text-left text-sm cursor-pointer rounded my-1 p-1 px-2 hover:bg-blue-500">{item}
                    </button>
                  ))
                  }
                  {filteredSearch.length === 0 &&
                    <p className="text-sm font-semibold text-center">No Category Found</p>
                  }
                </div>
              </div>
            }


            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Short Description</label>
              <div className="relative">
                <textarea maxLength={200} onChange={handleShortDesc} rows={6} className="rounded p-1 px-2 w-full outline-0 border-2 border-white/20 focus:border-white/80 text-sm min-h-20 max-h-fit" placeholder="Briefly describe your product..." name="shortDesc" />
                <p className="absolute bottom-3 right-3 text-xs font-semibold">{"0/200"}</p>
              </div>
              {fieldErrors?.shortDesc && <span className="mt-1 text-xs text-red-500">{fieldErrors?.shortDesc}</span>}
            </div>
          </div>

          <div className="flex gap-2">
            <Toggle onChange={setCod} defaultChecked />
            <span className="text-sm font-semibold">Cash On Delivery</span>
          </div>

          {/* <div className="prose dark:prose-invert max-w-none" */}
          {/*   dangerouslySetInnerHTML={{ __html: description }} */}
          {/* /> */}


          <div className="">
            {variants.map((variant, index) => (
              <div key={index} className="flex flex-col pt-4">
                {variants.length > 0 &&
                  <div className="flex flex-col gap-4 py-4 border-t-2 border-white/20">
                    <div className="flex justify-between w-full gap-4">
                      <button className="flex items-center gap-2 cursor-pointer" onClick={() => setExpandVariant(variant.id)} type="button">
                        <Icon className={`transition-all duration-75 ${expandVariant === variant.id && "rotate-90"}`} fontSize={20} icon="line-md:chevron-small-right" />
                        <span className="font-bold text-nowrap">Varaint #{index + 1}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVariants(variants.filter((_, i) => i !== index))
                        }}
                        className="flex cursor-pointer p-2 px-3 gap-2 text-sm font-semibold items-center rounded bg-red-500" >
                        <Icon fontSize={16} icon="line-md:trash" />
                      </button>

                    </div>

                    {expandVariant === variant.id &&
                      <div>
                        <ProductVariant
                          index={index}
                          variant={variant}
                          setVariant={(v) => handleVariantChange(index, v)} />
                      </div>
                    }
                  </div>
                }
              </div>
            ))}
          </div>

        </div>

        <div className="flex gap-4 w-full justify-end select-none">
          <button
            onClick={() => {
              const newVariant = emptyVariant
              setVariants(prev => ([...prev, newVariant]))
              setExpandVariant(newVariant.id)
            }}
            className="flex mr-auto gap-1 leading-5 text-xs p-2 px-3 font-semibold bg-green-800 text-green-400 rounded-md cursor-pointer"
            type="button">
            <Icon fontSize={20} icon="material-symbols:add-rounded" />
            Add Variant
          </button>
          <button className="text-xs cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Save Draft</button>
          <button className="text-xs cursor-pointer active:scale-95 duration-200 bg-blue-700  px-4 font-semibold rounded-md" type="submit">Publish Product</button>
        </div>
      </form >
    </div >
  )
}

