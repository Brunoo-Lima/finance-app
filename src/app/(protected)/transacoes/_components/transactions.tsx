"use client";

import { TableData } from "./table-data/table-data";

import s from "./_transactions.module.scss";
import { FilterIcon } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { InputSearch } from "@/components/ui/input/input-search/input-search";

export const Transactions = () => {
  const {
    paginatedData,
    handlePageChange,
    totalPages,
    page,
    selectedCategory,
    setSelectedCategory,
  } = useTransactions();

  const isEmpty = paginatedData?.length === 0;

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.header__transactions}>
        <InputSearch placeholder="Pesquisar transação" />

        <Dropdown
          classNameWrapper={s.dropdown__custom}
          options={[
            {
              label: "Todas",
              value: "",
            },
            {
              label: "Deposito",
              value: "DEPOSIT",
            },
            {
              label: "Despesa",
              value: "EXPENSE",
            },
            {
              label: "Investimento",
              value: "INVESTMENT",
            },
          ]}
          icon={<FilterIcon size={16} color="#ffffff" />}
          value={selectedCategory.toString()}
          onChange={(e) => setSelectedCategory(e as any)}
          placeholder="Selecione"
        />
      </div>

      <TableData data={paginatedData} isEmpty={isEmpty} />

      {!isEmpty && paginatedData.length > 7 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          marginLeft="auto"
        />
      )}
    </div>
  );
};
