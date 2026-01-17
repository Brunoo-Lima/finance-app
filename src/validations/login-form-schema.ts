import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.email('E-mail é obrigatório'),
  password: z
    .string('Senha é obrigatório')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional(),
});

export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
