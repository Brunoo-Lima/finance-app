import {
  Category,
  TransactionPayment,
  TransactionType,
} from "@/@types/ITransaction";

export const getTransactionType = (type: TransactionType): string => {
  const labels: Record<TransactionType, string> = {
    [TransactionType.EXPENSE]: "Despesa",
    [TransactionType.INVESTMENT]: "Investimento",
    [TransactionType.DEPOSIT]: "Depósito",
  };
  return labels[type] || type;
};

export const getTransactionTypeClass = (type: TransactionType): string => {
  const classMap: Record<TransactionType, string> = {
    [TransactionType.EXPENSE]: "expense",
    [TransactionType.INVESTMENT]: "investment",
    [TransactionType.DEPOSIT]: "deposit",
  };
  return classMap[type] || "";
};

export const getCategoryLabel = (category: Category): string => {
  const labels: Record<Category, string> = {
    [Category.TRANSPORTATION]: "Transporte",
    [Category.ENTERTAINMENT]: "Entretenimento",
    [Category.EDUCATION]: "Educação",
    [Category.HOUSING]: "Moradia",
    [Category.UTILITY]: "Utilidades",
    [Category.HEALTH]: "Saúde",
    [Category.SALARY]: "Salário",
    [Category.FOOD]: "Alimentação",
    [Category.OTHER]: "Outro",
  };
  return labels[category] || category;
};

export function getPaymentLabel(payment: TransactionPayment): string {
  const labels: Record<TransactionPayment, string> = {
    [TransactionPayment.BANK_SLIP]: "Comprovante bancário",
    [TransactionPayment.BANK_TRANSFER]: "Transferência bancária",
    [TransactionPayment.CREDIT_CARD]: "Cartão de Crédito",
    [TransactionPayment.DEBIT_CARD]: "Cartão de Débito",
    [TransactionPayment.CASH]: "Dinheiro",
    [TransactionPayment.PIX]: "Pix",
    [TransactionPayment.OTHER]: "Outro",
  };
  return labels[payment] || payment;
}
