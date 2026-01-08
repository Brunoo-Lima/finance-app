"use client";

import { FormUpsertTransaction } from "@/app/(protected)/transacoes/_components/form/form-upsert-transaction";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";

import s from "./_add-button-transaction.module.scss";

export const AddButtonTransaction = () => {
  const [isOpenFormTransaction, setIsOpenFormTransaction] =
    useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={s.btn__add__transaction}
        onClick={() => setIsOpenFormTransaction(true)}
      >
        Adicionar Transação <ArrowUpDownIcon size={18} />
      </button>

      {isOpenFormTransaction && (
        <FormUpsertTransaction
          onClose={() => setIsOpenFormTransaction(false)}
        />
      )}
    </>
  );
};
