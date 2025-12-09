export enum TransactionType {
  EXPENSE,
  INVESTMENT,
  DEPOSIT,
}

export enum Category {
  TRANSPORTATION,
  ENTERTAINMENT,
  EDUCATION,
  HOUSING,
  UTILITY,
  HEALTH,
  SALARY,
  FOOD,
  OTHER,
}

export enum TransactionPayment {
  CREDIT_CARD,
  DEBIT_CARD,
  BANK_TRANSFER,
  BANK_SLIP,
  CASH,
  PIX,
  OTHER,
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
