import { z } from 'zod';

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.email('Digite um e-mail válido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type IRegisterFormSchema = z.infer<typeof registerFormSchema>;
