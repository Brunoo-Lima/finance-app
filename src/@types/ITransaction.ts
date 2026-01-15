export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
  DEPOSIT = 'DEPOSIT',
}

export enum Category {
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  EDUCATION = 'EDUCATION',
  HOUSING = 'HOUSING',
  UTILITY = 'UTILITY',
  HEALTH = 'HEALTH',
  SALARY = 'SALARY',
  FOOD = 'FOOD',
  CAR = 'CAR',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

export enum TransactionPayment {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  BANK_SLIP = 'BANK_SLIP',
  CASH = 'CASH',
  PIX = 'PIX',
  OTHER = 'OTHER',
}

export interface ITransaction {
  id: number;
  name: string;
  category: Category;
  payment: TransactionPayment;
  amount: number;
  type: TransactionType;
  created_at: string;
}
