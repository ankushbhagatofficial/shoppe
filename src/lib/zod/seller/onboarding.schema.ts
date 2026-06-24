import { z } from "zod"

export const businessSchema = z.object({
  businessType: z.enum(["individual", "company"], "Unknown business type."),

  gstNumber: z.string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Invalid GST number"),

  businessAddress: z.string()
    .min(10, "Business address is required").max(200, "Business address is too long"),
})

export const bankSchema = z.object({
  accountHolder: z.string().min(3, "Account holder name must be at least 3 characters long.")
    .max(100, "Account holder name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Account holder name can only contain letters and spaces"),

  accountNumber: z.string()
    .regex(/^[0-9]{9,18}$/, "Account number must be 9-18 digits"),

  ifscCode: z.string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),

  bankName: z.string().min(3, "Bank name must be at least 3 characters long.")
    .max(50, "Bank name is too long"),

});

export const storeSchema = z.object({
  storeName: z.string().min(3, "Store Name must be at least 3 characters long.")
    .max(50, "Store name is too long"),

  storeURL: z.string().min(3, "Store URL must be at least 3 characters long.")
    .max(30, "Store URL is too long"),

  storeDescription: z.string().min(3, "Store Description must be at least 3 characters long.")
    .max(50, "Store Description is too long"),
})

export const onboardingSchema = z.object({
  businessType: z.enum(["individual", "company"], "Unknown business type."),

  gstNumber: z.string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Invalid GST number"),

  businessAddress: z.string()
    .min(10, "Business address is required").max(200, "Business address is too long"),

  accountHolder: z.string().min(3, "Account holder name must be at least 3 characters long.")
    .max(100, "Account holder name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Account Holder name can only contain letters and spaces"),

  accountNumber: z.string()
    .regex(/^[0-9]{9,18}$/, "Account Number must be 9-18 digits"),

  ifscCode: z.string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),

  bankName: z.string().min(3, "Bank Name must be at least 3 characters long.")
    .max(50, "Bank name is too long"),

  storeName: z.string().min(3, "Store Name must be at least 3 characters long.")
    .max(50, "Store name is too long"),

  storeURL: z.string().min(3, "Store URL must be at least 3 characters long.")
    .max(30, "Store URL is too long"),

  storeDescription: z.string().min(3, "Store Description must be at least 3 characters long.")
    .max(50, "Store Description is too long"),

})
