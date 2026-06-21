"use server"

import Seller from "@/lib/model/seller.model";
import connectDB from "@/lib/mongodb";
import { OnboardingStore } from "@/store/seller/onboarding";
import { auth } from "@/lib/auth";

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
    panCard,
    identityCard,
    gstCertificate,
    storeLogo,
    storeBanner,
    storeName,
    storeURL,
    storeDescription
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
        panCard: { url: panCard.blob },
        identityCard: { url: identityCard.blob },
        gstCertificate: { url: gstCertificate.blob },
      },
      store: {
        logo: storeLogo.blob,
        banner: storeBanner.blob,
        name: storeName,
        url: storeURL,
        description: storeDescription,
      },
      onboardingComplete: true,
    })
  }

  return {
    success: true
  }

}

