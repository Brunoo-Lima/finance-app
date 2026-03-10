import { z } from 'zod';

export const goalFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  contributionMonthly: z.string().min(1, 'Contribuição mensal é obrigatória'),
  valueAchieved: z.string(),
  valueTotal: z.string().min(1, 'Valor total é obrigatório'),
  dateFinal: z.date().min(1, 'Prazo é obrigatório'),
});

export type IGoalFormSchema = z.infer<typeof goalFormSchema>;
