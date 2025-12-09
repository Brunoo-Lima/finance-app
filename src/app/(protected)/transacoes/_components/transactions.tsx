"use client";

import { TableData } from "./table-data/table-data";

import s from "./_transactions.module.scss";
import { Button } from "@/components/ui/button/button";
import { ArrowLeftRightIcon } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useState } from "react";
import { FormUpsertTransaction } from "./form/form-upsert-transaction";

export const Transactions = () => {
  const { paginatedData, handlePageChange, totalPages, page } =
    useTransactions();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const isEmpty = paginatedData?.length === 0;

  return (
    <>
      <div className={s.transactions__wrapper}>
        <div className={s.header__transactions}>
          <Button
            className={s.button__add}
            onClick={() => setIsOpenModal(true)}
          >
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

      {isOpenModal && (
        <FormUpsertTransaction onClose={() => setIsOpenModal(false)} />
      )}
    </>
  );
};
