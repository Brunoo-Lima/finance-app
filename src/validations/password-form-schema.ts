import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.email('E-mail é obrigatório'),
});

export type IForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;
