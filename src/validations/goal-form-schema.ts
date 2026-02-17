import { z } from 'zod';

export const goalFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  contributionMonthly: z.number().min(1, 'Valor de contribuição é obrigatório'),
  valueAchieved: z.number().min(0, 'Valor conquistado é obrigatório'),
  valueTotal: z.number().min(1, 'Valor alvo é obrigatório'),
  dateFinal: z.string().min(1, 'Prazo é obrigatório'),
});

export type IGoalFormSchema = z.infer<typeof goalFormSchema>;
