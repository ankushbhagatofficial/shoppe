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


export const onboardingSchema = z.object({
  businessType: z.enum(["individual", "company"])
})
