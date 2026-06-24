import { z } from "zod"

declare module "zod" {
  interface ZodType {
    priority(): z.ZodAny;
  }
}

