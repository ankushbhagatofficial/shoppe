"use client"

import axios from "axios";
import { Icon } from "@iconify/react"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Product from "./steps/ProductDetails";
import Variants from "./steps/ProductVariants";

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

  type ProductData = {
    productName: string,
    brand: string,
    category: { name: string, id: string },
    tags: string[],
    shortDesc: string,
    description: string,
    cod: boolean,
    slug?: string,
  }

  const [productData, setProductData] = useState<ProductData>({
    productName: "",
    brand: "",
    category: { name: "", id: "" },
    tags: [],
    shortDesc: "",
    description: "",
    cod: true,
  })

  const [productSubmit, setProductSubmit] = useState(false)
  const [variantsSubmit, setVariantsSubmit] = useState(false)
  const [complete, setComplete] = useState(false)
  const [step, setStep] = useState(0)
  const next = () => setStep(1)
  const prev = () => setStep(0)

  const steps = [
    <Product
      submit={productSubmit}
      setSubmit={setProductSubmit}
      next={next} data={productData}
      setData={setProductData} />,

    <Variants submit={variantsSubmit}
      slug={productData?.slug}
      complete={setComplete}
      setSubmit={setVariantsSubmit} />
  ]

  const ProductStep = steps[step]

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
      <div className="flex justify-center items-center">
        <div className={`flex justify-center items-center size-10 rounded-full transition-all ${step > 0 ? "bg-green-600" : "bg-neutral-600"} border-2 ${step === 0 ? "border-green-600" : "border-transparent"}`}>
          <Icon fontSize={20} icon="material-symbols:inventory-2-outline-rounded" />
        </div>
        <div className={`h-1 bg-neutral-600 flex-[0.2] after:content-[] after:block after:transition-all after:h-1 after:bg-green-600 ${step > 0 ? "after:w-full" : "after:w-0"}`}></div>
        <div className={`flex justify-center items-center size-10 rounded-full transition-all ${complete && step > 0 ? "bg-green-600" : "bg-neutral-600"} border-2 ${step === 1 ? "border-green-600" : "border-transparent"}`}>
          <Icon fontSize={20} icon="material-symbols:add-notes-outline-rounded" />
        </div>
      </div>
      <div className="flex flex-col border border-white/20 rounded-lg p-5 gap-4 overflow-y-auto">
        {ProductStep}
      </div>
      {step === 0 &&
        <div className="flex flex-wrap gap-4 w-full md:justify-end select-none h-10">
          <button onClick={() => closeModal()} className="text-xs h-full text-nowrap cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Cancel</button>
          <button className="flex h-full justify-center items-center w-fit text-xs text-nowrap cursor-pointer active:scale-95 duration-200 bg-blue-700 px-4 font-semibold rounded-md" form="product-details" type="submit">
            {productSubmit ?
              <Loading className='h-[50%] w-fit' />
              :
              "Continue"
            }
          </button>
        </div>
      }
      {step === 1 &&
        <div className="flex flex-wrap gap-4 w-full md:justify-end select-none h-10">
          <button onClick={prev} className="text-xs text-nowrap cursor-pointer active:scale-95 duration-200 border bg-white text-black py-2 px-4 font-semibold rounded-md" type="button">Back</button>
          <button className="text-xs text-nowrap cursor-pointer active:scale-95 bg-yellow-400 text-black px-4 font-semibold rounded-md" form="product-variants" type="submit">Publish</button>
        </div>
      }
    </div >
  )
}

