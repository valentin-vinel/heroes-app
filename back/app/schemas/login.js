import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().nonempty().email(),
  password: z.string().nonempty(),
});