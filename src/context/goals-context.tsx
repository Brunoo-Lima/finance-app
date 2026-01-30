'use client';

import { usePagination } from '@/hooks/use-pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { IGoal } from '@/@types/IGoal';

export const GoalsContext = createContext<IGoalsContextProps | undefined>(
  undefined,
);

interface IGoalsContextProps {
  paginatedData: IGoal[];
  page: number;
  totalPages: number;
  // balance: number;
  selectedGoal: IGoal | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<IGoal | null>>;

  // investmentBalance: number;
  // expenseBalance: number;
  // revenueBalance: number;
  // totalsByCategory: Record<string, { total: number; types: Set<string> }>;
  // grandTotal: number;
  allGoals: IGoal[];

  handlePageChange: (page: number) => void;
  // handleAddBalance: (value: number) => void;
  // addTransaction: (transaction: Omit<ITransaction, 'id'>) => void;
  // editTransaction: (transaction: ITransaction) => void;
}

interface IGoalsProviderProps {
  children: ReactNode;
}

export function GoalsProvider({ children }: IGoalsProviderProps) {
  const [goals, setGoals] = useLocalStorage<IGoal[]>('goals', []);
  const [selectedGoal, setSelectedGoal] = useState<IGoal | null>(null);
  const itemsPerPage = 7;

  const { page, totalPages, handlePageChange, paginatedData } = usePagination(
    goals,
    itemsPerPage,
  );

  // const investmentBalance = goals.reduce(
  //   (acc, item) => (item.type === 'INVESTMENT' ? acc + item.amount : acc),
  //   0,
  // );

  // const revenueBalance = transactions.reduce(
  //   (acc, item) => (item.type === 'DEPOSIT' ? acc + item.amount : acc),
  //   0,
  // );

  // const expenseBalance = transactions.reduce(
  //   (acc, item) => (item.type === 'EXPENSE' ? acc + item.amount : acc),
  //   0,
  // );

  // const totalsByCategory = transactions.reduce(
  //   (acc, transaction) => {
  //     const { category, type, amount } = transaction;

  //     if (!acc[category]) {
  //       acc[category] = {
  //         total: 0,
  //         types: new Set<string>(),
  //       };
  //     }

  //     acc[category].total += amount;
  //     acc[category].types.add(type);

  //     return acc;
  //   },
  //   {} as Record<string, { total: number; types: Set<string> }>,
  // );

  // const grandTotal = Object.values(totalsByCategory).reduce(
  //   (acc, item) => acc + item.total,
  //   0,
  // );

  // useEffect(() => {
  //   const balanceStored = localStorage.getItem('balance');
  //   if (balanceStored) {
  //     setBalance(parseFloat(balanceStored));
  //   }
  // }, [setBalance]);

  // const handleAddBalance = (value: number) => {
  //   setBalance(value);
  //   localStorage.setItem('balance', value.toString());
  // };

  // function addTransaction(transaction: Omit<ITransaction, 'id'>) {
  //   const newId =
  //     transactions.length > 0
  //       ? Math.max(...transactions.map((t) => t.id)) + 1
  //       : 1;
  //   const newTransaction = { ...transaction, id: newId };

  //   const updatedTransactions = [...transactions, newTransaction];
  //   setTransactions(updatedTransactions);

  //   localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

  //   const newBalance = calculateBalance(updatedTransactions);
  //   setBalance(newBalance);
  //   localStorage.setItem('balance', newBalance.toString());
  // }

  // function editTransaction(transaction: ITransaction) {
  //   const updatedTransactions = transactions.map((t) =>
  //     t.id === transaction.id ? transaction : t,
  //   );
  //   setTransactions(updatedTransactions);

  //   localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

  //   const newBalance = calculateBalance(updatedTransactions);
  //   setBalance(newBalance);
  //   localStorage.setItem('balance', newBalance.toString());
  // }

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    selectedGoal,
    setSelectedGoal,
    allGoals: goals,
    handlePageChange,
  };

  return (
    <GoalsContext.Provider value={contextValue}>
      {children}
    </GoalsContext.Provider>
  );
}
