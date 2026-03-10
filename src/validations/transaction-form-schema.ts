import { z } from 'zod';

const TransactionTypeEnum = z.enum(['DEPOSIT', 'EXPENSE', 'INVESTMENT']);
const TransactionPaymentEnum = z.enum([
  'CREDIT_CARD',
  'DEBIT_CARD',
  'BANK_TRANSFER',
  'BANK_SLIP',
  'CASH',
  'PIX',
  'OTHER',
]);

const TransactionCategory = z.enum([
  'TRANSPORTATION',
  'ENTERTAINMENT',
  'EDUCATION',
  'HOUSING',
  'UTILITY',
  'HEALTH',
  'SALARY',
  'FOOD',
  'OTHER',
]);

export const transactionFormSchema = z.object({
  name: z.string().min(1, 'Título é obrigatório'),
  amount: z.string().min(1, 'Valor é obrigatório'),
  transactionType: TransactionTypeEnum,
  payment: TransactionPaymentEnum,
  category: TransactionCategory,
  date: z.date().min(1, 'Data é obrigatória'),
});

export type ITransactionFormSchema = z.infer<typeof transactionFormSchema>;
