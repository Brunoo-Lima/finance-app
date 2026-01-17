import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.email('E-mail é obrigatório'),
});

export type IForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;

export const newPasswordFormSchema = z
  .object({
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

export type INewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>;

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
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

export type IChangePasswordFormSchema = z.infer<
  typeof changePasswordFormSchema
>;
