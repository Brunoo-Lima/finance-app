import { transactionsList } from "@/mocks/transactions-list";
import { TableData } from "./table-data/table-data";

import s from "./_transactions.module.scss";

export const Transactions = () => {
  return (
    <div className={s.transactions__wrapper}>
      <TableData data={transactionsList} />
    </div>
  );
};
