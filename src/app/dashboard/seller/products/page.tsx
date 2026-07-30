"use client"

import { Icon } from "@iconify/react"
import axios from "axios";
import Error from "@/components/Error"
import SearchIcon from '@iconify-react/fa-solid/search';
import Loading from '@iconify-react/svg-spinners/ring-resize';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SellerType } from "@/lib/model/seller.model";
import { AnimatePresence, motion } from "motion/react";
import AddProduct from "@/components/dashboard/seller/products/AddProduct";

type Product = {
  id: string,
  name: string,
  slug: string,
  category: string,
  variants: number,
  priceRange: number,
  stock: string,
  sales: number,
  status: "draft" | "active" | "inactive",
  updatedAt: string
}

export default function page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  })
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    products: 0
  })
  const [productId, setProductId] = useState("")
  const [menu, setMenu] = useState<number | boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState(new Set<string>())
  const [data, setData] = useState<Partial<SellerType>>({})
  const [productModal, setProductModal] = useState(false)
  const [dataChange, setDataChange] = useState(true)
  const [error, setError] = useState("")

  const status = {
    pending: {
      title: "Pending",
      icon: "mdi:clock-outline",
      colors: "text-yellow-800 bg-yellow-300",
    },
    approved: {
      title: "Verified",
      icon: "material-symbols:verified-outline-rounded",
      colors: "text-green-800 bg-green-300",
    },
    rejected: {
      title: "Rejected",
      icon: "material-symbols:cancel-outline-rounded",
      colors: "text-red-800 bg-red-300",
    },
  }

  const currentStatus = status[data?.status as keyof typeof status]

  const productStatus = {
    draft: "bg-yellow-900 text-yellow-400",
    active: "bg-green-900 text-green-400",
    inactive: "bg-red-900 text-red-400",
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/seller")
        setData(res.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message)
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await axios.get("/api/seller/products",
        { params: { page, limit } }
      )
      if (res.status === 200) {
        setProducts(res.data?.products)
        setPagination(res.data?.pagination)
        setStats(res.data?.stats)
        setLoading(false)
      }
    }
    if (dataChange) {
      fetchData()
    }

  }, [dataChange, page])

  const toggleProduct = (id: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(id))
      newSelected.delete(id)
    else
      newSelected.add(id)

    setSelected(newSelected)
  }

  const toggleAll = () => {
    if (selected.size === products.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(products.map(c => c.id)));
    }
  }

  if (Object.keys(data).length === 0) return (
    <div className="flex h-[88dvh] justify-center items-center">
      {error ?
        <Error title={error} />
        :
        <Loading height="2.5em" />
      }
    </div>
  )

  if (data?.status !== "approved") return (
    <div className="flex h-[88dvh] justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-50 h-50 bg-neutral-700 rounded-full">
          <Icon className="absolute w-full h-full text-yellow-500" icon="glyphs:box-open-duo" />
          <Icon className="absolute text-white/80 bottom-0 left-0 w-[50%] h-[50%]" icon="ic:round-lock" />
        </div>
        <div>
          <h1 className="text-center text-lg md:text-xl font-bold text-balance">You can't manage products yet</h1>
          <p className="text-center text-xs font-semibold text-balance">Your account is not verified yet. Once your account is verified, you will be able to add, edit and manage your products.</p>
        </div>
        <div className={`w-fit p-1 px-3 flex items-center gap-1 text-xs rounded-full ${currentStatus.colors}`}>
          <Icon className='h-full w-full' icon={currentStatus.icon} />
          <p className="text-nowrap font-semibold">{"Verification Status: "}{currentStatus.title}</p>
        </div>
        <div className="">
          <Link className="flex gap-1 items-center font-poppins text-sm py-2 px-5 bg-green-700 rounded-full font-semibold" href="/dashboard/seller/settings?tab=account" >
            <Icon icon="mdi:shield-check-outline" />
            View Verification Status
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative flex flex-col gap-4 h-[88dvh]">

      {productModal && <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        className="absolute z-20 rounded-md w-full h-full backdrop-blur-xl"></motion.div>
      }

      <AnimatePresence>
        {productModal &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='sticky z-20 top-1/2'>
            <div className="absolute left-1/2 top-5 -translate-1/2 p-5 w-full md:w-[95%] h-[88dvh] bg-neutral-800 rounded-lg border border-white/20">
              <AddProduct id={productId} onSuccess={setDataChange} closeModal={() => setProductModal(false)} />
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Products</h1>
          <p className="text-xs font-semibold">Manage and organize your products.</p>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div>
          <label className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" height="20" />
            <input placeholder="Search product..." className="border-2 text-sm w-full h-full p-1 px-10 rounded-full" type="text" />
          </label>
        </div>
        <div>
          <button onClick={() => setProductModal(true)} className="rounded-full h-10 text-nowrap flex font-semibold text-sm items-center gap-1 cursor-pointer py-2 px-4 bg-blue-800" type="button">
            <Icon fontSize={20} icon="material-symbols:add-rounded" />
            Add Product
          </button>
        </div>
      </div>

      <div className="w-full rounded-lg bg-neutral-800 min-h-[66dvh] h-full overflow-x-auto">
        {loading ?
          <div className="flex min-h-[66dvh] justify-center items-center">
            <Loading height="40" />
          </div>
          :
          <table className="w-full text-left">
            <thead className="">
              <tr className="text-sm">
                <th className="p-4 text-white/60 font-semibold group">
                  <div className="flex gap-2 peer">
                    <input
                      className="opacity-0 group-hover:opacity-100 checked:opacity-100"
                      checked={
                        products.length > 0 &&
                        selected.size === products.length
                      }
                      onChange={toggleAll}
                      type="checkbox" />
                    Product
                  </div>
                </th>
                <th className="text-nowrap p-4 text-white/60 font-semibold">Category</th>
                <th className="p-4 text-white/60 font-semibold text-center">Variants</th>
                <th className="text-nowrap p-4 text-white/60 font-semibold">Price Range</th>
                <th className="p-4 text-white/60 font-semibold text-center">Stock</th>
                <th className="p-4 text-white/60 font-semibold text-center">Sales</th>
                <th className="text-nowrap p-4 text-white/60 font-semibold text-center">Status</th>
                <th className="text-nowrap p-4 text-white/60 font-semibold">Updated</th>
                <th className="p-4 text-white/60 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr className="text-sm border-t border-b border-white/20" key={product.slug}>
                  <td className="p-4 group">
                    <div className="flex gap-2">
                      <input
                        className="opacity-0 group-hover:opacity-100 checked:opacity-100"
                        type="checkbox"
                        onChange={() => toggleProduct(product.id)}
                        checked={selected.has(product.id)}
                      />
                      {product.name}
                    </div>
                  </td>

                  <td className="p-4 ">{product.category}</td>
                  <td className="p-4 text-center">{product.variants}</td>
                  <td className="p-4">{product.priceRange}</td>
                  <td className="p-4 text-center">{product.stock}</td>
                  <td className="p-4 text-center">{product.sales}</td>
                  <td className="p-4 flex justify-center">
                    <span
                      className={`flex items-center gap-1 w-fit p-1 px-2 font-semibold text-sm ${productStatus[product.status]} rounded`}>
                      <span>•</span>
                      <p>
                        {product.status}
                      </p>
                    </span>
                  </td>
                  <td className="p-4 ">{product.updatedAt}</td>
                  <td>
                    <div className="relative flex justify-center items-center">
                      <button
                        onClick={() => setMenu(menu === index ? false : index)}
                        className="cursor-pointer" type="button">
                        <Icon fontSize={20} icon="mdi:dots-vertical" />
                      </button>
                      {menu === index &&
                        <div className="z-30 overflow-hidden absolute mt-2 right-0 top-full rounded-md border border-white/20 bg-neutral-700">
                          <button className="flex w-full gap-2 p-1.5 hover:bg-neutral-800/50 active:bg-neutral-800/50 cursor-pointer items-center text-nowrap text-sm font-semibold" type="button">
                            <Icon fontSize={18} icon="solar:eye-outline" />
                            View Product
                          </button>
                          <button
                            onClick={() => {
                              setMenu(false)
                              setProductId(product.id)
                              setProductModal(true)
                            }}
                            className="flex w-full gap-2 p-1.5 hover:bg-neutral-800/50 active:bg-neutral-800/50 cursor-pointer items-center text-nowrap text-sm font-semibold" type="button">
                            <Icon fontSize={18} icon="solar:pen-2-outline" />
                            Edit Product
                          </button>
                          <button className="flex w-full gap-2 p-1.5 hover:bg-neutral-800/50 active:bg-neutral-800/50 cursor-pointer items-center text-sm font-semibold" type="button">
                            <Icon fontSize={18} icon="solar:copy-outline" />
                            Duplicate
                          </button>
                          <button className="flex w-full gap-2 p-1.5 hover:bg-neutral-800/50 active:bg-neutral-800/50 cursor-pointer items-center text-sm font-semibold" type="button">
                            <Icon fontSize={18} icon="solar:archive-outline" />
                            Archive
                          </button>
                          <button className="flex w-full gap-2 p-1.5 hover:bg-neutral-800/50 active:bg-neutral-800/50 cursor-pointer items-center text-red-500 text-sm font-semibold" type="button">
                            <Icon fontSize={18} icon="solar:trash-bin-trash-outline" />
                            Delete
                          </button>
                        </div>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>

    </div >
  )
}


