import { transactionsList } from "@/mocks/transactions-list";
import { CardTransaction } from "./card-transaction/card-transaction";
import Link from "next/link";

import s from "./_transactions.module.scss";

export const Transactions = () => {
  const filteredList = transactionsList.slice(0, 11);

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.transactions__header}>
        <strong>Transações</strong>

        <Link href={"/transacoes"} className={s.link__more}>
          Ver mais
        </Link>
      </div>

      <div className={s.transactions__list}>
        {filteredList.map((transaction) => (
          <CardTransaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};
