import { ITransaction } from "@/@types/ITransaction";
import { PixIcon } from "@/components/icons/pix-icon";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyBR } from "@/utils/format-currency";
import { formatDateTransaction } from "@/utils/format-date";
import { BarcodeIcon, CreditCardIcon } from "lucide-react";

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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="size-10 p-2.5 rounded-md bg-accent flex items-center justify-center">
          {getIcons()}
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-base">{transaction.description}</p>
          <span className="text-xs text-[#71717A]">
            {formatDateTransaction(transaction.created_at)}
          </span>
        </div>
      </div>

      <p
        className={
          transaction.type === "entrada" ? "text-[#5EA500]" : "text-[#E93030]"
        }
      >
        {transaction.type === "entrada" ? "+" : "-"}
        {formatCurrencyBR(transaction.value)}
      </p>
    </div>
  );
};
