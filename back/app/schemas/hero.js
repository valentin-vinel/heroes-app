import { z } from "zod";

export const heroSchema = z.object({
  hero_name: z.string().trim().nonempty(),
  firstname: z.string().trim().nonempty(),
  lastname: z.string().trim().nonempty(),
  profile_img: z.string().trim().nonempty(),
  png_img: z.string().trim().nonempty(),
  description: z.string().nonempty(),
  bg_gradient: z.string(),
  name_color: z.string(),
  id_app_user: z.number().int().positive(),
});

export const updateHeroSchema = heroSchema.partial();