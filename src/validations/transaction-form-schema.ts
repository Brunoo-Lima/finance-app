import { z } from "zod";

const TransactionTypeEnum = z.enum(["DEPOSIT", "EXPENSE", "INVESTMENT"]);

export const transactionFormSchema = z.object({
  name: z.string().min(1, "Título é obrigatório"),
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => !isNaN(parseFloat(val)), "Valor deve ser um número"),
  transactionType: TransactionTypeEnum,
  payment: z.string().min(1, "Método de pagamento é obrigatório"),
  date: z
    .string()
    .min(10, "Data deve estar no formato DD/MM/AAAA")
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido (DD/MM/AAAA)"),
});

export type ITransactionFormSchema = z.infer<typeof transactionFormSchema>;
