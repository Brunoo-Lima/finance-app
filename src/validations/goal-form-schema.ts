import { z } from 'zod';

export const goalFormSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  amountTarget: z.number().min(1, 'Valor alvo é obrigatório'),
  amountSaved: z.number().min(0).optional(),
  contributionMonthly: z.number().min(0).optional(),
  termDate: z.string().min(1, 'Prazo é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

export type IGoalFormSchema = z.infer<typeof goalFormSchema>;
