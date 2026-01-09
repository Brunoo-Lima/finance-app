"use client";

import { FormUpsertTransaction } from "@/app/(protected)/transacoes/_components/form/form-upsert-transaction";
import { ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button/button";

export const AddButtonTransaction = () => {
  const [isOpenFormTransaction, setIsOpenFormTransaction] =
    useState<boolean>(false);

  return (
    <>
      <Button variant="default" onClick={() => setIsOpenFormTransaction(true)}>
        Adicionar Transação <ArrowUpDownIcon size={18} />
      </Button>

      {isOpenFormTransaction && (
        <FormUpsertTransaction
          onClose={() => setIsOpenFormTransaction(false)}
        />
      )}
    </>
  );
};
