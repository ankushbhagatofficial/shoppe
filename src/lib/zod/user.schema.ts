import { z } from "zod"

z.ZodType.prototype.priority = function() {
  const self = this;
  return z.any().superRefine((val, ctx) => {
    const result = self.safeParse(val);
    if (!result.success) ctx.addIssue(result.error.issues[0]);
  });
};

export const userSchema = z.object({
  name: z.string({ message: "Name field is required!" }).trim()
    .min(3, " Name must be at least 3 characters long.")
    .regex(/[a-zA-Z]/, "Name Must contains letters").priority(),

  email: z.email({ message: "Please enter a valid email" }),

  password: z.string({ message: "Password field is required!" })
    .min(8, "Password must be at least 8 characters long.")
    .max(60, "Password cannot be longer than 60 characters."),

  confirmPassword: z.string({ message: "Confirm password field is required!" })
})
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    }
  );

