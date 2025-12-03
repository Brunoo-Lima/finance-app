import { ITransaction } from "@/@types/ITransaction";
import { PixIcon } from "@/components/icons/pix-icon";
import { formatCurrencyBR } from "@/utils/format-currency";
import { formatDateTransaction } from "@/utils/format-date";
import { BarcodeIcon, CreditCardIcon } from "lucide-react";
import s from "./_card-transaction.module.scss";

interface ICardTransactionProps {
  transaction: ITransaction;
}

export const CardTransaction = ({ transaction }: ICardTransactionProps) => {
  const getIcons = () => {
    switch (transaction.payment) {
      case "cartao":
        return (
          <CreditCardIcon
            size={20}
            color={
              transaction.type === "entrada"
                ? "oklch(0.648 0.2 131.684)"
                : transaction.type === "saida"
                  ? "#E93030"
                  : "#B8B8B8"
            }
          />
        );
      case "pix":
        return (
          <PixIcon
            color={
              transaction.type === "entrada"
                ? "oklch(0.648 0.2 131.684)"
                : transaction.type === "saida"
                  ? "#E93030"
                  : "#B8B8B8"
            }
          />
        );
      default:
        return (
          <BarcodeIcon
            size={20}
            color={
              transaction.type === "entrada"
                ? "oklch(0.648 0.2 131.684)"
                : transaction.type === "saida"
                  ? "#E93030"
                  : "#B8B8B8"
            }
          />
        );
    }
  };

  return (
    <div className={s.card__container}>
      <div className={s.infos}>
        <div className={s.badge}>{getIcons()}</div>

        <div className={s.info__data}>
          <p>{transaction.description}</p>
          <span>{formatDateTransaction(transaction.created_at)}</span>
        </div>
      </div>

      <p className={transaction.type === "entrada" ? s.entry : s.cost}>
        {transaction.type === "entrada" ? "+" : "-"}
        {formatCurrencyBR(transaction.value)}
      </p>
    </div>
  );
};
