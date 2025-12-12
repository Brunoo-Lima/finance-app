"use client";

import { ITransaction } from "@/@types/ITransaction";
import { usePagination } from "@/hooks/use-pagination";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { createContext, ReactNode, useMemo, useState } from "react";

export const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);

interface ITransactionsContextProps {
  paginatedData: ITransaction[];
  page: number;
  totalPages: number;
  searchTerm: string;
  handlePageChange: (page: number) => void;
  addTransaction: (tx: Omit<ITransaction, "id">) => void;
  allTransactions: ITransaction[];
}

interface ITransactionsProvider {
  children: ReactNode;
}

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [transactions, setTransactions] = useLocalStorage<ITransaction[]>(
    "transactions",
    [],
  );
  const itemsPerPage = 7;

  const filtered = useMemo(() => {
    if (!searchTerm) return transactions;

    return transactions.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [transactions, searchTerm]);

  const { page, totalPages, handlePageChange, paginatedData } = usePagination(
    filtered,
    itemsPerPage,
  );

  function addTransaction(tx: Omit<ITransaction, "id">) {
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1;
    const newTx = { ...tx, id: newId };
    setTransactions([...transactions, newTx]);
  }

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    searchTerm,
    handlePageChange,
    addTransaction,
    allTransactions: transactions,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}
