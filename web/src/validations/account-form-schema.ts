import z from 'zod';

export const accountFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Digite um e-mail válido'),
});

export type IAccountFormSchema = z.infer<typeof accountFormSchema>;
