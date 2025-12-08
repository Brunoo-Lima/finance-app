"use client";

import { TableData } from "./table-data/table-data";

import s from "./_transactions.module.scss";
import { Button } from "@/components/ui/button/button";
import { ArrowLeftRightIcon } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { Pagination } from "@/components/ui/pagination/pagination";

export const Transactions = () => {
  const { paginatedData, handlePageChange, totalPages, page } =
    useTransactions();

  const isEmpty = paginatedData?.length === 0;

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.header__transactions}>
        <Button className={s.button__add}>
          Adicionar transação <ArrowLeftRightIcon size={20} />
        </Button>
      </div>

      <TableData data={paginatedData} isEmpty={isEmpty} />

      {!isEmpty && (
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
