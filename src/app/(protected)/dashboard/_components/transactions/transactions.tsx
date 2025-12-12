"use client";

import { CardTransaction } from "./card-transaction/card-transaction";
import Link from "next/link";

import s from "./_transactions.module.scss";
import { useTransactions } from "@/hooks/use-transactions";

export const Transactions = () => {
  const { allTransactions } = useTransactions();

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.transactions__header}>
        <strong>Transações</strong>
        <Link href={"/transacoes"} className={s.link__more}>
          Ver mais
        </Link>
      </div>
      <div className={s.transactions__list}>
        {allTransactions?.map((transaction) => (
          <CardTransaction key={transaction.id} transaction={transaction} />
        ))}
        {allTransactions.length === 0 && (
          <span className={s.transactions__empty}>
            Nenhuma transação encontrada
          </span>
        )}
      </div>
    </div>
  );
};
