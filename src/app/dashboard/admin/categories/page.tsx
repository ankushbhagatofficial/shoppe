"use client"

import axios from "axios";
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import Loading from '@iconify-react/svg-spinners/ring-resize';
import AddCategory from "@/components/dashboard/admin/categories/AddCategory";
import UpdateCategory from "@/components/dashboard/admin/categories/UpdateCategory";
import { formatDateToDDYYYYMM } from "@/utils/general";
import DeleteCategory from "@/components/dashboard/admin/categories/DeleteCategory";

type Category = {
  _id: string,
  name: string,
  slug: string,
  createdAt: Date,
  active: boolean,
  productCount: number
}

export default function page() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [dataChange, setDataChange] = useState(true)
  const [categoryModal, setCategoryModal] = useState(false)
  const [updateModal, setUpdateModal] = useState({
    open: false,
    category: {} as Category
  })
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    ids: [] as string[]
  })
  const [selected, setSelected] = useState(new Set<string>())

  const stats = {
    length: pagination.total,
    active: categories.filter(category => category.active).length,
    inactive: categories.filter(category => !category.active).length,
    total: categories.reduce((prev, category) => prev + category.productCount, 0)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await axios.get("/api/admin/categories",
        { params: { page, limit } }
      )
      if (res.status === 200) {
        setCategories(res.data?.categories)
        setPagination(res.data?.pagination)
        setLoading(false)
      }
    }
    if (dataChange) {
      fetchData()
    }

  }, [dataChange, page])

  const toggleCategory = (id: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(id))
      newSelected.delete(id)
    else
      newSelected.add(id)

    setSelected(newSelected)
  }

  const toggleAll = () => {
    if (selected.size === categories.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(categories.map(c => c._id)));
    }
  }

  return (
    <div className="relative flex flex-col p-2 gap-4">

      {(categoryModal || updateModal.open || deleteModal.open) && <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        className="absolute z-20 rounded-md w-full h-full backdrop-blur-xl"></motion.div>
      }

      <AnimatePresence>
        {(categoryModal || updateModal.open || deleteModal.open) &&
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='sticky z-20 top-1/2'>
            <div className="absolute left-1/2 top-5 -translate-1/2 p-5 w-full md:w-[50%]  bg-neutral-800 rounded-lg border border-white/20">
              {categoryModal &&
                <AddCategory onSuccess={setDataChange} onClose={() => setCategoryModal(false)} />
              }
              {updateModal.open &&
                <UpdateCategory onSuccess={setDataChange} category={updateModal.category} onClose={() => setUpdateModal({ open: false, category: {} as Category })} />
              }
              {deleteModal.open &&
                <DeleteCategory onSuccess={setDataChange} ids={deleteModal.ids} onClose={() => setDeleteModal({ open: false, ids: [] as string[] })} />
              }
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg md:text-xl">Categories</h1>
          <p className="text-sm text-white/60">Manage product categories in your store</p>
        </div>

        <button onClick={() => setCategoryModal(true)} className="rounded-full h-10 text-nowrap flex font-semibold text-sm items-center gap-1 cursor-pointer py-2 px-4 bg-blue-800" type="button">
          <Icon fontSize={20} icon="material-symbols:add-rounded" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex  gap-2 p-5 flex-1 bg-neutral-800 rounded-md">
          <div className="flex mt-1 shrink-0 justify-center w-8 h-8 lg:h-10 lg:w-10 items-center bg-blue-700 rounded-md">
            <Icon className="h-[60%] w-fit" icon="material-symbols:dashboard-outline-rounded" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs lg:text-sm text-white/60">Total Categories</p>
            <h2 className="text-lg font-bold">{stats.length}</h2>
          </div>
        </div>

        <div className="flex gap-2 p-5 flex-1 bg-neutral-800 rounded-md">
          <div className="flex mt-1 shrink-0 justify-center w-8 h-8 lg:h-10 lg:w-10 items-center bg-green-700 rounded-md">
            <Icon className="h-[60%] w-fit" icon="material-symbols:check-circle-outline-rounded" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs lg:text-sm text-white/60">Active Categories</p>
            <h2 className="text-lg font-bold">{stats.active}</h2>
          </div>
        </div>

        <div className="flex gap-2 p-5 flex-1 bg-neutral-800 rounded-md">
          <div className="flex mt-1 shrink-0 justify-center w-8 h-8 lg:h-10 lg:w-10 items-center bg-yellow-600 rounded-md">
            <Icon className="h-[60%] w-fit" icon="mdi:cube-outline" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs lg:text-sm text-white/60">Total Products</p>
            <h2 className="text-lg font-bold">{stats.total}</h2>
          </div>
        </div>

        <div className="flex gap-2 p-5 flex-1 bg-neutral-800 rounded-md">
          <div className="flex mt-1 shrink-0 justify-center w-8 h-8 lg:h-10 lg:w-10 items-center bg-red-700 rounded-md">
            <Icon className="h-[60%] w-fit" icon="mdi:tag-outline" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs lg:text-sm text-white/60">Inactive Categories</p>
            <h2 className="text-lg font-bold">{stats.inactive}</h2>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg bg-neutral-800 min-h-[66dvh] h-full">
        {selected.size > 0 &&
          <div className="p-4 flex items-center justify-between w-full border-b border-white/20">
            <p className="text-sm font-semibold">{selected.size} selected</p>
            <button
              type="button"
              onClick={() => {
                setDeleteModal({ open: true, ids: [...selected] })
              }}
              className="flex cursor-pointer p-2 px-3 gap-2 text-sm font-semibold items-center rounded bg-red-500" >
              <Icon fontSize={16} icon="line-md:trash" />
              Delete
            </button>
          </div>
        }
        {loading ?
          <div className="flex min-h-[66dvh] justify-center items-center">
            <Loading height="40" />
          </div>
          :
          <table className="w-full text-left">
            <thead className="">
              <tr>
                <th className="p-4 text-white/60 font-semibold group">
                  <div className="flex gap-2 peer">
                    <input
                      className="opacity-0 group-hover:opacity-100 checked:opacity-100"
                      checked={
                        categories.length > 0 &&
                        selected.size === categories.length
                      }
                      onChange={toggleAll}
                      type="checkbox" />
                    CATEGORY
                  </div>
                </th>
                <th className="p-4 text-white/60 font-semibold">SLUG</th>
                <th className="p-4 text-white/60 font-semibold text-center">PRODUCTS</th>
                <th className="p-4 text-white/60 font-semibold text-center">STATUS</th>
                <th className="p-4 text-white/60 font-semibold">CREATED AT</th>
                <th className="p-4 text-white/60 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <tr className="border-t border-b border-white/20" key={category.slug}>
                  <td className="p-4 group">
                    <div className="flex gap-2">
                      <input
                        className="opacity-0 group-hover:opacity-100 checked:opacity-100"
                        type="checkbox"
                        onChange={() => toggleCategory(category._id)}
                        checked={selected.has(category._id)}
                      />
                      {category.name}
                    </div>
                  </td>
                  <td className="p-4">{category.slug}</td>
                  <td className="p-4 text-center">{category.productCount}</td>
                  <td className="p-4 text-center">
                    <span className={`p-1 px-2 font-semibold text-sm ${category.active ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"} rounded`}>{category.active ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="p-4">{formatDateToDDYYYYMM(category.createdAt)}</td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => {
                        setUpdateModal({ open: true, category })
                      }} className="cursor-pointer size-8 flex justify-center items-center rounded border border-blue-400 text-blue-400" type="button"><Icon icon="line-md:edit" /></button>
                      <button onClick={() => {
                        setDeleteModal({ open: true, ids: [category._id] })
                      }} className="cursor-pointer size-8 flex justify-center items-center rounded border border-red-400 text-red-400" type="button"><Icon icon="line-md:trash" /></button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        }
        <div className="flex flex-col p-4 gap-4">
          <p className="text-sm font-semibold text-white/60">Showing page {page} of {pagination.totalPages}</p>
          <div className="flex gap-4 flex-wrap">
            <button
              disabled={pagination.totalPages > page}
              className="cursor-pointer min-h-10 min-w-10 rounded p-2 px-3 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-700 text-sm font-semibold"
              onClick={() => setPage(page - 1)}
              type="button">
              <Icon icon="line-md:chevron-left" />
            </button>


            {Array.from(
              { length: pagination.totalPages },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`${pagination.page === i + 1 ? "bg-white/80 text-black" : "bg-neutral-700"} cursor-pointer min-h-10 min-w-10 rounded p-2 px-3 text-sm font-semibold`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              disabled={pagination.totalPages === page}
              className="cursor-pointer min-h-10 min-w-10 rounded p-2 px-3 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-700 text-sm font-semibold"
              onClick={() => setPage(page + 1)}
              type="button">
              <Icon icon="line-md:chevron-right" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

