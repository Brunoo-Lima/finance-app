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
import { endOfMonth, startOfMonth } from 'date-fns';
import { useDashboard } from '@/hooks/use-dashboard';

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
  selectedTransactionId: number | null;
  selectedMethodPayment: TransactionPayment | '';
  setSelectedMethodPayment: React.Dispatch<
    React.SetStateAction<TransactionPayment | ''>
  >;

  deleteDataUser: boolean;

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
  handleDeleteTransaction: (id: number) => void;
  handleSelectedTransactionId: (id: number) => void;
  handleDeleteDataUser: () => void;
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
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [selectedMethodPayment, setSelectedMethodPayment] = useState<
    TransactionPayment | ''
  >('');
  const [deleteDataUser, setDeleteDataUser] = useState<boolean>(false);
  const itemsPerPage = 7;
  const { from, to } = useDashboard();

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

      const itemDate = new Date(item.created_at);
      const matchesDate =
        itemDate >= startOfMonth(from) && itemDate <= endOfMonth(to);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    searchTerm,
    transactions,
    selectedCategory,
    selectedTypeTransaction,
    selectedMethodPayment,
    from,
    to,
  ]);

  const { page, totalPages, handlePageChange, paginatedData } = usePagination(
    filtered,
    itemsPerPage,
  );

  const investmentBalance = useMemo(
    () =>
      filtered.reduce(
        (acc, item) => (item.type === 'INVESTMENT' ? acc + item.amount : acc),
        0,
      ),
    [filtered],
  );

  const revenueBalance = useMemo(
    () =>
      filtered.reduce(
        (acc, item) => (item.type === 'DEPOSIT' ? acc + item.amount : acc),
        0,
      ),
    [filtered],
  );

  const expenseBalance = useMemo(
    () =>
      filtered.reduce(
        (acc, item) => (item.type === 'EXPENSE' ? acc + item.amount : acc),
        0,
      ),
    [filtered],
  );

  const totalsByCategory = useMemo(
    () =>
      filtered.reduce(
        (acc, transaction) => {
          const { category, type, amount } = transaction;
          if (!acc[category])
            acc[category] = { total: 0, types: new Set<string>() };
          acc[category].total += amount;
          acc[category].types.add(type);
          return acc;
        },
        {} as Record<string, { total: number; types: Set<string> }>,
      ),
    [filtered],
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

  useEffect(() => {
    if (deleteDataUser) {
      localStorage.removeItem('transactions');
      localStorage.removeItem('balance');
      localStorage.removeItem('goals');
      setTransactions([]);
      setBalance(0);
    }
  }, [deleteDataUser, setTransactions, setBalance]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handlePageChange(1);
  };

  const handleAddBalance = (value: number) => {
    setBalance((prev) => {
      const newBalance = prev + value;
      localStorage.setItem('balance', newBalance.toString());
      return newBalance;
    });
  };

  function calculateBalance(transactions: ITransaction[]): number {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'DEPOSIT') return total + transaction.amount;
      if (transaction.type === 'EXPENSE') return total - transaction.amount;
      if (transaction.type === 'INVESTMENT') return total - transaction.amount;
      return total;
    }, 0);
  }

  function addTransaction(transaction: Omit<ITransaction, 'id'>) {
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;
    const newTransaction = { ...transaction, id: newId };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    const newBalance = calculateBalance(updatedTransactions);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance.toString());
  }

  function editTransaction(transaction: ITransaction) {
    const updatedTransactions = transactions.map((t) =>
      t.id === transaction.id ? transaction : t,
    );
    setTransactions(updatedTransactions);

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    const newBalance = calculateBalance(updatedTransactions);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance.toString());
  }

  const handleSelectedTransactionId = (id: number) => {
    setSelectedTransactionId(id);
  };

  const handleDeleteTransaction = (id: number) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);

    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleDeleteDataUser = () => {
    setDeleteDataUser(true);
  };

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
    selectedTransactionId,
    selectedMethodPayment,
    setSelectedMethodPayment,
    deleteDataUser,
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
    handleDeleteTransaction,
    handleSelectedTransactionId,
    handleDeleteDataUser,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}
