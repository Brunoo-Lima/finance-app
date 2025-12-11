"use client";

import { ITransaction } from "@/@types/ITransaction";
import { usePagination } from "@/hooks/use-pagination";
import { transactionsList } from "@/mocks/transactions-list";
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
}

interface ITransactionsProvider {
  children: ReactNode;
}

export const TransactionsProvider = ({ children }: ITransactionsProvider) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [transactions, setTransactions] =
    useState<ITransaction[]>(transactionsList);
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

  const contextValue = {
    paginatedData,
    page,
    totalPages,
    searchTerm,
    handlePageChange,
  };

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};
