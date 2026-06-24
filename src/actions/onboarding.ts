"use server"

import Seller from "@/lib/model/seller.model";
import connectDB from "@/lib/mongodb";
import { OnboardingStore } from "@/store/seller/onboarding";
import { auth } from "@/lib/auth";
import { uploadOnCloudinary } from "@/lib/cloudinary";

export async function onboardingUploadAction(file: { name: string, src: string }): Promise<string | undefined> {
  const session = await auth()
  const user = session?.user

  try {
    const result = await uploadOnCloudinary(file?.src, `sellers/${user?.id}`)
    return result?.secure_url
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error("failed to upload, file not found.")
    } else {
      throw new Error("failed to upload file.")
    }
  }

}

export async function checkStoreURL(storeURL: string): Promise<boolean | string | void> {
  if (!storeURL) return
  if (storeURL.length > 30) return
  const result = await Seller.exists({ "store.url": storeURL })
  return !!result
}

export async function onboardingAction(formData: OnboardingStore["formData"]): Promise<{ success: boolean } | undefined> {
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
    files
  } = formData


  if (user?.role === "seller") {
    const seller = await Seller.findByIdAndUpdate(user?.id, {
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
      documents: {
        panCard: { url: files.panCard?.url },
        identityCard: { url: files.identityCard?.url },
        gstCertificate: { url: files.gstCertificate?.url },
      },
      store: {
        name: storeName,
        url: storeURL,
        description: storeDescription,
        logo: files.storeLogo?.url,
        banner: files.storeBanner?.url,
      },
      onboardingComplete: true,
    })
  }

  return {
    success: true
  }

}

