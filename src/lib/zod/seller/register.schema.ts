import { z } from "zod"

declare module "zod" {
  interface ZodType {
    priority(): z.ZodAny;
  }
}

z.ZodType.prototype.priority = function() {
  const self = this;
  return z.any().superRefine((val, ctx) => {
    const result = self.safeParse(val);
    if (!result.success) ctx.addIssue(result.error.issues[0]);
  });
};

export const sellerSchema = z.object({
  name: z.string({ message: "Name field is required!" }).trim()
    .min(3, "Name must be at least 3 characters long.")
    .regex(/[a-zA-Z]/, "Name Must contains letters").priority(),

  email: z.email({ message: "Please enter a valid email" }),

  phone: z.string({message: "Number field cannot be empty!"})
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),

  password: z.string({ message: "Password field is required!" })
    .min(8, "Password must be at least 8 characters long.")
    .max(60, "Password cannot be longer than 60 characters."),

  terms: z.boolean().refine(val => val === true, "You must accept the terms!")

})
  // .refine(
  //   (data) => data.password === data.cpassword,
  //   {
  //     message: "Passwords do not match!",
  //     path: ["cpassword"],
  //   }
  // );

