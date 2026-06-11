import { z } from "zod"

export const userSchema = z.object({
  name: z.string({ message: "Name field is required!" }).trim().min(3)
    .regex(/[a-zA-Z]/, "Name Must contains letters"),

  email: z.email({ message: "Please enter a valid email" }),

  role: z.string({ message: "Please select your role" }).trim(),

  password: z.string({ message: "Password field is required!" })
    .min(8, "Password must be at least 8 characters long.")
    .max(60, "Password cannot be longer than 60 characters."),

  cpassword: z.string({ message: "Confirm password field is required!" })
    .min(8, "Password must be at least 8 characters long.")
    .max(60, "Password cannot be longer than 60 characters.")
})
  .refine(
    (data) => data.password === data.cpassword,
    {
      message: "Passwords do not match!",
      path: ["cpassword"],
    }
  );

