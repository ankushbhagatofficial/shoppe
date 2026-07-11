"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Error from "@/components/Error"
import Loading from '@iconify-react/svg-spinners/ring-resize';
import Profile from "@/components/dashboard/seller/settings/Profile";
import Account from "@/components/dashboard/seller/settings/Account";
import Bank from "@/components/dashboard/seller/settings/Bank";
import { useSearchParams, useRouter } from "next/navigation";

export default function page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const [data, setData] = useState({})
  const [error, setError] = useState("")

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

  const tabs = {
    profile: { label: "Profile", icon: "mdi:user", component: Profile },
    bank: { label: "Bank", icon: "mdi:bank", component: Bank },
    account: { label: "Account", icon: "mdi:lock", component: Account },
  }

  type Tabs = keyof typeof tabs

  const active = tab ? (tab in tabs ? tab : "profile") : "profile"

  useEffect(() => {
    if (tab !== active)
      router.replace(`?tab=${active}`)
  }, [])

  const Tab = tabs[active as Tabs].component

  if (Object.keys(data).length === 0) return (
    <div className="flex h-[88dvh] justify-center items-center">
      {error ?
        <Error title={error} />
        :
        <Loading height="2.5em" />
      }
    </div>
  )

  const changeTab = (tab: Tabs) => {
    router.replace(`?tab=${tab}`)
  }

  return (
    <div className="flex flex-col p-2">
      <div className="flex p-2 gap-4 w-full justify-between rounded-full border-white/20 border-2">
        {
          Object.entries(tabs).map(([key, item]) => {
            return (
              <div key={item.label} className="flex flex-1">
                <button onClick={() => changeTab(key as Tabs)} type="button" className="w-full cursor-pointer">
                  <span className={`${active === key ? "bg-blue-800" : "bg-neutral-800"} text-xs md:text-sm gap-1 border-white/20 border-2 font-semibold flex items-center p-2 justify-center w-full rounded-full`} >
                    <Icon fontSize={18} icon={item.icon} />
                    <p>
                      {item.label}
                    </p>
                  </span>
                </button>
              </div>
            )
          })
        }
      </div>

      <div className="p-2 my-6 h-full border-white/20 border rounded-md">
        <Tab seller={data} />
      </div>

    </div>
  )
}

