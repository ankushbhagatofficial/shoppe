import { checkStoreURL } from "@/actions/onboarding";
import { z } from "zod"

z.ZodType.prototype.priority = function() {
  const self = this;
  return z.any().superRefine((val, ctx) => {
    const result = self.safeParse(val);
    if (!result.success) ctx.addIssue(result.error.issues[0]);
  });
};

export const profileSchema = z.object({
  name: z.string({ message: "Name field is required!" }).trim()
    .min(3, "Name must be at least 3 characters long.")
    .regex(/[a-zA-Z]/, "Name Must contains letters").priority(),

  gstNumber: z.union([
    z.literal(""),
    z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Invalid GST number"),
  ]),

  businessAddress: z.string()
    .min(10, "Business address is required").max(200, "Business address is too long"),

  storeName: z.string().min(3, "Store Name must be at least 3 characters long.")
    .max(50, "Store name is too long"),

  storeURL: z.string().min(3, "Store URL must be at least 3 characters long.")
    .max(30, "Store URL is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Store URL can only contain lowercase letters, numbers, and hyphens.",
    })
    .superRefine(async (val, ctx) => {
      const exists = await checkStoreURL(val)

      if (exists) {
        return ctx.addIssue({
          code: "custom",
          message: "Store URL already taken"
        })
      }
    }),

  storeDescription: z.string().min(3, "Store Description must be at least 3 characters long.")
    .max(500, "Store Description is too long"),
})


export const passwordSchema = z.object({
  currentPassword: z.string({ message: "Current password field is required!" }),

  newPassword: z.string({ message: "Password field is required!" })
    .min(8, "Password must be at least 8 characters long.")
    .max(60, "Password cannot be longer than 60 characters."),
})

export const emailSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
})

export const phoneSchema = z.object({
  phone: z.string({ message: "Number field cannot be empty!" })
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
})

export const bankSchema = z.object({
  accountHolder: z.string().min(3, "Account holder name must be at least 3 characters long.")
    .max(100, "Account holder name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Account Holder name can only contain letters and spaces"),

  accountNumber: z.string()
    .regex(/^[0-9]{9,18}$/, "Account Number must be 9-18 digits"),

  ifscCode: z.string()
    .superRefine(async (val, ctx) => {
      const ifsc = await fetch("https://ifsc.razorpay.com/" + val)

      if (ifsc.status !== 200) {
        return ctx.addIssue({
          code: "custom",
          message: "Invalid IFSC code"
        })

      }
    }),

  bankName: z.string().min(3, "Bank Name must be at least 3 characters long.")
    .max(50, "Bank name is too long"),
})
