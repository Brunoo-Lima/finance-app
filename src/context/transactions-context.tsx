'use client';

import {
  Category,
  ITransaction,
  TransactionPayment,
  TransactionType,
} from '@/@types/ITransaction';
import { usePagination } from '@/hooks/use-pagination';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { createContext, ReactNode, useMemo, useState } from 'react';

export const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);

interface ITransactionsContextProps {
  paginatedData: ITransaction[];
  page: number;
  totalPages: number;
  searchTerm: string;
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
  handlePageChange: (page: number) => void;
  handleSearch: (term: string) => void;
  addTransaction: (tx: Omit<ITransaction, 'id'>) => void;
  editTransaction: (tx: ITransaction) => void;
  allTransactions: ITransaction[];
}

interface ITransactionsProvider {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transactions, setTransactions] = useLocalStorage<ITransaction[]>(
    'transactions',
    [],
  );
  const itemsPerPage = 7;
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedTypeTransaction, setSelectedTypeTransaction] = useState<
    TransactionType | ''
  >('');
  const [selectedMethodPayment, setSelectedMethodPayment] = useState<
    TransactionPayment | ''
  >('');

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handlePageChange(1);
  };

  function addTransaction(tx: Omit<ITransaction, 'id'>) {
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;
    const newTx = { ...tx, id: newId };
    setTransactions([...transactions, newTx]);
  }

  function editTransaction(tx: ITransaction) {
    const updatedTransactions = transactions.map((t) =>
      t.id === tx.id ? tx : t,
    );
    setTransactions(updatedTransactions);
  }

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedTypeTransaction,
    setSelectedTypeTransaction,
    selectedMethodPayment,
    setSelectedMethodPayment,
    addTransaction,
    allTransactions: transactions,
    editTransaction,
    handlePageChange,
    handleSearch,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}
