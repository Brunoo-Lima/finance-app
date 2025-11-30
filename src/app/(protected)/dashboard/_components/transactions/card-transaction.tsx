import { ITransaction } from "@/@types/ITransaction";
import { PixIcon } from "@/components/icons/pix-icon";
import { formatCurrencyBR } from "@/utils/format-currency";
import { formatDateTransaction } from "@/utils/format-date";
import { CreditCardIcon, ScanBarcodeIcon } from "lucide-react";

interface ICardTransactionProps {
  transaction: ITransaction;
}

export const CardTransaction = ({ transaction }: ICardTransactionProps) => {
  const getIcons = () => {
    switch (transaction.payment) {
      case "cartao":
        return <CreditCardIcon />;
      case "pix":
        return <PixIcon />;
      default:
        return <ScanBarcodeIcon />;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {getIcons()}

        <div className="flex flex-col">
          <p>{transaction.description}</p>
          <span>{formatDateTransaction(transaction.created_at)}</span>
        </div>
      </div>

      <p
        className={
          transaction.type === "entrada" ? "text-green-500" : "text-red-500"
        }
      >
        {transaction.type === "entrada" ? "+" : "-"}
        {formatCurrencyBR(transaction.value)}
      </p>
    </div>
  );
};
