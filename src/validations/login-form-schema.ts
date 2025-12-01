import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
