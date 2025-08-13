import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().nonempty(),
  password: z.string().nonempty(),
});