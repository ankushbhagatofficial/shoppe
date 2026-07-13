import axios from "axios"
import { useEffect, useState } from "react"

type Props = {
  data: Record<string, unknown>,
  params: Record<string, unknown>
  effectOn: any
}

export default function fetchQuery(url: string, { data, params, effectOn }: Props) {
  const [Data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [fieldErrors, setFieldErrors] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false)
      try {
        const response = await axios.get(url, {
          data: data,
          params: params
        })
        setData(response?.data)
        setLoading(true)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const errorData = e.response?.data
          if (errorData?.message) {
            setError(errorData?.message)
          }
          setFieldErrors(errorData?.errors)
        }
      }
    }

    fetchData()
  }, [effectOn])

  return { data: Data, loading, error, fieldErrors, effectOn }
}


