"use server"

import { signIn } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation"
import axios from "axios"

async function getUrl() {

  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development"
    ? "http"
    : "https";

  return `${protocol}://${host}`;
}

type User = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

type Seller = {
  name: string,
  email: string,
  phone: string,
  terms: boolean,
  password: string,
}

export async function registerAction(formData: User): Promise<{ success?: boolean, message?: string, errors?: any } | undefined> {
  const url = await getUrl()
  let res

  try {
    res = await axios.post(`${url}/api/auth/register`, { ...formData, role: "user" });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400) {
        return {
          success: false,
          errors: error?.response?.data?.message.fieldErrors,
        }
      } else {
        return {
          success: false,
          message: error?.response?.data?.message
        }
      }
    }
  }

  switch (res?.data?.user.role) {
    case "user": redirect("/login")
    case "admin": redirect("/dashboard/admin")
  }
}

export async function sellerAction(formData: Seller): Promise<{ success?: boolean, message?: string, errors?: any } | undefined> {
  const url = await getUrl()

  let res

  try {
    res = await axios.post(`${url}/api/auth/seller/register`, { ...formData, role: "seller" });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 400) {
        return {
          success: false,
          errors: error?.response?.data?.message.fieldErrors,
        }
      } else {
        return {
          success: false,
          message: error?.response?.data?.message
        }
      }
    }
  }

  if (res?.status === 200) {
    const data = res.data

    const seller = {
      id: data.seller._id.toString(),
      name: data.seller.name,
      email: data.seller.email,
      role: data.seller.role,
    }

    await signIn("credentials", { ...seller, redirectTo: "/seller/onboarding" })
  }
}
