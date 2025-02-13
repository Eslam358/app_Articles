import { z } from "zod";

export const registerValidation = z.object({
  username: z.string().nonempty().min(3).max(20),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8),
});
export const logInValidation = z.object({

  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8),
});
export const createArticleValidation = z.object({

  title: z.string().nonempty().min(3),
  description: z.string().nonempty().min(8),
});
