"use client"

import axios from "axios";
import { Icon } from "@iconify/react"
import { useState, useEffect, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function AddProduct({ closeModal }: { closeModal: Function }) {
  const categories: string[] = [
    "Electronics",
    "Mobiles",
    "Laptops",
    "Computers",
    "Computer Accessories",
    "Tablets",
    "Smart Watches",
    "Wearable Devices",
    "Audio",
    "Headphones",
    "Earbuds",
    "Speakers",
    "Cameras",
    "Camera Accessories",
    "Gaming",
    "Gaming Consoles",
    "Gaming Accessories",
    "Networking",
    "Storage Devices",
    "Printers",
    "Office Electronics",
    "TV & Entertainment",
    "Home Appliances",
    "Kitchen Appliances",
    "Large Appliances",
    "Small Appliances",
    "Furniture",
    "Home Decor",
    "Home Improvement",
    "Lighting",
    "Bathroom",
    "Kitchen & Dining",
    "Cookware",
    "Bakeware",
    "Storage & Organization",
    "Cleaning Supplies",
    "Garden",
    "Outdoor Living",
    "Tools & Hardware",
    "Fashion",
    "Men's Clothing",
    "Women's Clothing",
    "Kids' Clothing",
    "Baby Clothing",
    "Footwear",
    "Sports Shoes",
    "Casual Shoes",
    "Bags",
    "Wallets",
    "Luggage",
    "Jewellery",
    "Watches",
    "Sunglasses",
    "Beauty",
    "Skin Care",
    "Hair Care",
    "Makeup",
    "Perfumes",
    "Personal Care",
    "Health Care",
    "Medical Supplies",
    "Nutrition",
    "Vitamins",
    "Sports & Fitness",
    "Gym Equipment",
    "Yoga",
    "Cycling",
    "Running",
    "Camping",
    "Hiking",
    "Cricket",
    "Football",
    "Badminton",
    "Basketball",
    "Swimming",
    "Books",
    "Educational Books",
    "Comics",
    "Magazines",
    "Stationery",
    "Office Supplies",
    "School Supplies",
    "Art & Craft",
    "Toys",
    "Educational Toys",
    "Board Games",
    "Action Figures",
    "Baby Products",
    "Diapers",
    "Baby Care",
    "Pet Supplies",
    "Dog Supplies",
    "Cat Supplies",
    "Aquarium",
    "Bird Supplies",
    "Groceries",
    "Beverages",
    "Snacks",
    "Food Staples",
    "Organic Food",
    "Dairy",
    "Frozen Foods",
    "Automotive",
    "Car Accessories",
    "Motorcycle Accessories",
    "Car Care",
    "Tyres",
    "Industrial",
    "Scientific Supplies",
    "Safety Equipment",
    "Power Tools",
    "Hand Tools",
    "Electrical Supplies",
    "Building Materials",
    "Musical Instruments",
    "Musical Accessories",
    "Movies",
    "Music",
    "Video Games",
    "Collectibles",
    "Antiques",
    "Handmade",
    "Craft Supplies",
    "Party Supplies",
    "Gift Items",
    "Gift Cards",
    "Religious Items",
    "Seasonal Products",
    "Travel Accessories",
    "Smart Home",
    "Security Systems",
    "Solar Products",
    "Eco-Friendly Products",
    "Digital Products",
    "Software",
    "Phone Accessories",
    "Tablet Accessories",
    "Laptop Accessories",
    "Drone & Accessories",
    "3D Printers",
    "Virtual Reality",
    "Augmented Reality",
    "Photography",
    "Fishing",
    "Hunting",
    "Office Furniture",
    "Commercial Equipment",
    "Restaurant Supplies",
    "Salon Supplies",
    "Medical Equipment",
    "Laboratory Equipment",
    "Agriculture",
    "Seeds & Plants",
    "Livestock Supplies",
  ]
  const [category, setCategory] = useState("")
  const [showCategory, setShowCategory] = useState(false)
  const [search, setSearch] = useState("")
  const filteredSearch = categories.filter(item => item.toLowerCase().includes(search.toLowerCase()))

  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])

  function selectCategory(value: string) {
    setCategory(value);
    setSearch("");
    setShowCategory(false);
  }

  function handleTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return

    e.preventDefault()
    setTags(prev => [...prev, tag])
    setTag("")
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
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
      <form className="flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col border border-white/20 rounded-lg p-5 gap-4">
          <div className="flex flex-col gap-4">
            <label className="font-bold">Product Information</label>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Product Name <span className="text-red-500">*</span></label>
                <input className="border rounded p-1 px-2 w-full" placeholder="Enter Product Name" type="text" name="name" required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Brand Name</label>
                <input className="border rounded p-1 px-2 w-full" placeholder="Enter Brand Name" type="text" name="brand" />
              </div>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="font-semibold text-sm">Select Category <span className="text-red-500">*</span></label>
              <div className="flex flex-col gap-4">
                <input onClick={() => setShowCategory(true)} readOnly className="border rounded p-1 px-2 w-full" value={category} type="text" name="category" placeholder="Select Product Category" />
                {showCategory &&
                  <div className="flex flex-col gap-4 bg-neutral-700/50 w-full rounded-md p-5">
                    <div>
                      <input type="text" autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search category..."
                        className="w-full rounded border outline-0 px-3 py-1" />
                    </div>

                    <div className="flex flex-col h-52 border border-white/20 rounded p-2 overflow-y-auto">
                      {
                        filteredSearch.map((item, index) => (
                          <button key={index} onClick={() => selectCategory(item)} type="button" className="text-left rounded my-1 p-1 px-2 hover:bg-green-700">{item}</button>
                        ))
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm">Tags</label>
              <input onChange={(e) => setTag(e.target.value)} onKeyDown={handleTag} placeholder="Type a tag" value={tag} className="rounded border outline-0 px-3 py-1" type="text" name="tags" />
              <div className="flex gap-2 flex-wrap">
                {tags.map((item, index) => (
                  <span className="flex gap-2 text-sm rounded-full pl-3 p-0.5 bg-neutral-700" key={item}>{item}
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

          <div className="flex flex-col gap-4">
            <label className="font-bold">Pricing</label>

            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Price <span className="text-red-500">*</span></label>
                <input className="border rounded p-1 px-2 w-full" placeholder="Enter Price" type="text" name="name" required />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold text-sm">Cost Price</label>
                <input className="border rounded p-1 px-2 w-full" placeholder="Enter Cost Price" type="text" name="brand" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full justify-end select-none">
          <button className="text-xs cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Save Draft</button>
          <button className="text-xs cursor-pointer active:scale-95 duration-200 bg-blue-700  px-4 font-semibold rounded-md" type="submit">Publish Product</button>
        </div>
      </form>
    </div>
  )
}

