import { ITransaction, TransactionType } from "@/@types/ITransaction";
import { formatCurrencyBR } from "@/utils/format-currency";
import { formatDateTransaction } from "@/utils/format-date";
import s from "./_card-transaction.module.scss";
import { TransactionIcon } from "../../../_constants";

interface ICardTransactionProps {
  transaction: ITransaction;
}

export const CardTransaction = ({ transaction }: ICardTransactionProps) => {
  const getAmountPrefix = (transaction: ITransaction) => {
    switch (transaction.type) {
      case TransactionType.DEPOSIT:
        return "+";
      case TransactionType.EXPENSE:
      case TransactionType.INVESTMENT:
        return "-";
      default:
        return "";
    }
  };

  return (
    <div className={s.card__container}>
      <div className={s.infos}>
        <div className={s.badge}>
          <TransactionIcon
            payment={transaction.payment}
            type={transaction.type}
          />
        </div>

        <div className={s.info__data}>
          <p>{transaction.name}</p>
          <span>{formatDateTransaction(transaction.created_at)}</span>
        </div>
      </div>

      <p
        className={
          transaction.type === TransactionType.DEPOSIT
            ? s.entry
            : transaction.type === TransactionType.EXPENSE
              ? s.expense
              : s.investment
        }
      >
        {getAmountPrefix(transaction)}
        {formatCurrencyBR(transaction.amount)}
      </p>
    </div>
  );
};
