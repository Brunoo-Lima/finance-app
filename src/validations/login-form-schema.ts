import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("E-mail é obrigatório"),
  password: z.string("Senha é obrigatório"),
  remember: z.boolean().optional(),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
