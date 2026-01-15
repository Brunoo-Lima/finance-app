'use client';

import {
  Category,
  ITransaction,
  TransactionPayment,
  TransactionType,
} from '@/@types/ITransaction';
import { usePagination } from '@/hooks/use-pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

export const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);

interface ITransactionsContextProps {
  paginatedData: ITransaction[];
  page: number;
  totalPages: number;
  searchTerm: string;
  balance: number;
  selectedCategory: Category | '';
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | ''>>;
  selectedTypeTransaction: TransactionType | '';
  setSelectedTypeTransaction: React.Dispatch<
    React.SetStateAction<TransactionType | ''>
  >;
  selectedMethodPayment: TransactionPayment | '';
  setSelectedMethodPayment: React.Dispatch<
    React.SetStateAction<TransactionPayment | ''>
  >;
  investmentBalance: number;
  expenseBalance: number;
  revenueBalance: number;
  totalsByCategory: Record<string, { total: number; types: Set<string> }>;
  grandTotal: number;
  allTransactions: ITransaction[];

  handlePageChange: (page: number) => void;
  handleSearch: (term: string) => void;
  handleAddBalance: (value: number) => void;
  addTransaction: (transaction: Omit<ITransaction, 'id'>) => void;
  editTransaction: (transaction: ITransaction) => void;
}

interface ITransactionsProvider {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useLocalStorage<ITransaction[]>(
    'transactions',
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedTypeTransaction, setSelectedTypeTransaction] = useState<
    TransactionType | ''
  >('');
  const [selectedMethodPayment, setSelectedMethodPayment] = useState<
    TransactionPayment | ''
  >('');
  const itemsPerPage = 7;

  const filtered = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;

      const matchesType =
        !selectedTypeTransaction || item.type === selectedTypeTransaction;

      const matchesPayment =
        !selectedMethodPayment || item.payment === selectedMethodPayment;

      return matchesSearch && matchesCategory && matchesType && matchesPayment;
    });
  }, [
    searchTerm,
    transactions,
    selectedCategory,
    selectedTypeTransaction,
    selectedMethodPayment,
  ]);

  const { page, totalPages, handlePageChange, paginatedData } = usePagination(
    filtered,
    itemsPerPage,
  );

  const investmentBalance = transactions.reduce(
    (acc, item) => (item.type === 'INVESTMENT' ? acc + item.amount : acc),
    0,
  );

  const revenueBalance = transactions.reduce(
    (acc, item) => (item.type === 'DEPOSIT' ? acc + item.amount : acc),
    0,
  );

  const expenseBalance = transactions.reduce(
    (acc, item) => (item.type === 'EXPENSE' ? acc + item.amount : acc),
    0,
  );

  const totalsByCategory = transactions.reduce(
    (acc, transaction) => {
      const { category, type, amount } = transaction;

      if (!acc[category]) {
        acc[category] = {
          total: 0,
          types: new Set<string>(),
        };
      }

      acc[category].total += amount;
      acc[category].types.add(type);

      return acc;
    },
    {} as Record<string, { total: number; types: Set<string> }>,
  );

  const grandTotal = Object.values(totalsByCategory).reduce(
    (acc, item) => acc + item.total,
    0,
  );

  useEffect(() => {
    const balanceStored = localStorage.getItem('balance');
    if (balanceStored) {
      setBalance(parseFloat(balanceStored));
    }
  }, [setBalance]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handlePageChange(1);
  };

  const handleAddBalance = (value: number) => {
    setBalance(value);
    localStorage.setItem('balance', value.toString());
  };

  function addTransaction(transaction: Omit<ITransaction, 'id'>) {
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;
    const newTx = { ...transaction, id: newId };

    setTransactions([...transactions, newTx]);

    if (transaction.type === 'DEPOSIT') {
      setBalance(balance + transaction.amount);
    } else if (transaction.type === 'EXPENSE') {
      setBalance(balance - transaction.amount);
    } else if (transaction.type === 'INVESTMENT') {
      setBalance(balance - transaction.amount);
    }
  }

  function editTransaction(transaction: ITransaction) {
    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id ? transaction : t,
    );
    setTransactions(updatedTransactions);

    if (transaction.type === 'DEPOSIT') {
      setBalance(balance + transaction.amount);
    } else if (transaction.type === 'EXPENSE') {
      setBalance(balance - transaction.amount);
    } else if (transaction.type === 'INVESTMENT') {
      setBalance(balance - transaction.amount);
    }
  }

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    searchTerm,
    balance,
    selectedCategory,
    setSelectedCategory,
    selectedTypeTransaction,
    setSelectedTypeTransaction,
    selectedMethodPayment,
    setSelectedMethodPayment,
    addTransaction,
    allTransactions: transactions,
    editTransaction,
    investmentBalance,
    expenseBalance,
    revenueBalance,
    totalsByCategory,
    grandTotal,
    handlePageChange,
    handleSearch,
    handleAddBalance,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}
