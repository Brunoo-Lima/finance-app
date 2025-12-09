import { z } from "zod";

export const transactionFormSchema = z.object({
  name: z.string("Nome é obrigatório"),
  amount: z.string("Valor é obrigatório"),
  transactionType: z.string("Tipo de transação"),
  payment: z.string("Forma de pagamento é obrigatório"),
  date: z.string("Data é obrigatório"),
});

export type ITransactionFormSchema = z.infer<typeof transactionFormSchema>;
