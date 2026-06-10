"use server"

import { headers } from "next/headers";
import { redirect } from "next/navigation"
import axios from "axios"

type User = {
  name: string,
  email: string,
  role: string,
  password: string,
  cpassword: string
}

export async function registerAction(formData: User): Promise<{ success?: boolean, message?: string, errors?: any } | undefined> {

  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development"
    ? "http"
    : "https";

  const url = `${protocol}://${host}`;
  let res

  try {
    res = await axios.post(`${url}/api/auth/register`, formData);
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
    case "seller": redirect("/seller/onboarding")
  }
}
