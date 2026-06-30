"use server"

import Seller from "@/lib/model/seller.model";
import connectDB from "@/lib/mongodb";
import { OnboardingStore } from "@/store/seller/onboarding";
import { auth } from "@/lib/auth";
import { onboardingSchema } from "@/lib/zod/seller/onboarding.schema";

export async function checkStoreURL(storeURL: string): Promise<boolean | string | void> {
  const session = await auth()
  const user = session?.user

  if (!storeURL) return
  if (storeURL.length > 30) return
  const result = await Seller.exists({ "store.url": storeURL })

  return user?.id !== result?._id.toString()
}

export async function onboardingAction(formData: OnboardingStore["formData"]): Promise<{ success: boolean, errors?: any } | undefined> {
  await connectDB()
  const session = await auth()
  const user = session?.user

  const {
    businessType,
    businessAddress,
    gstNumber,
    accountHolder,
    accountNumber,
    ifscCode,
    bankName,
    storeName,
    storeURL,
    storeDescription,
  } = formData

  const result = onboardingSchema.safeParse(formData)
  let errors: Record<string, string | string[]> = {}

  if (!result.success) {
    errors = result.error.flatten().fieldErrors
  }

  const files = {
    documents: {
      panCard: "PAN Card is missing",
      identityCard: "Identity Card is missing",
      gstCertificate: "GST Certificate is missing",
    },
    store: {
      banner: "Store Banner is missing",
      logo: "Store Logo is missing",
    }
  }

  if (user?.role === "seller") {
    const seller = await Seller.findById(user?.id)

    for (const [field, fieldVal] of Object.entries(files)) {
      for (const [key, val] of Object.entries(fieldVal)) {
        if (!seller[field][key].url) {
          errors[key] = val
        }
      }
    }

    if (Object.keys(errors).length > 0)
      return {
        success: false,
        errors
      }

    await Seller.findByIdAndUpdate(user?.id, {
      business: {
        businessType,
        businessAddress,
        gstNumber,
      },
      bank: {
        accountHolder,
        accountNumber,
        ifscCode,
        bankName,
      },
      "store.name": storeName,
      "store.url": storeURL.toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
      "store.description": storeDescription,
      onboardingComplete: true,
    })
  }

  return {
    success: true
  }

}

