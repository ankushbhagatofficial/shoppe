import { z } from "zod"

export const userSchema = z.object({
  name: z.string({message: "Name field is required!"}).trim().min(3)
    .regex(/[a-zA-Z]/, "Must contains letters"),
  email: z.email({ message: "Please use a valid email" }),
  password: z.string({message: "Password field is required!"}).min(8).max(60),
  cpassword: z.string({message: "Confirm password field is required!"}).min(8).max(60)
})

