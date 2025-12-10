import { TransactionPayment, TransactionType } from "@/@types/ITransaction";
import { DebitCardIcon } from "@/components/icons/debit-card-icon";
import { PixIcon } from "@/components/icons/pix-icon";
import {
  BanknoteIcon,
  BarcodeIcon,
  CreditCardIcon,
  LandmarkIcon,
} from "lucide-react";

interface TransactionIconProps {
  payment: TransactionPayment;
  type: TransactionType;
}

const PAYMENT_ICONS: Partial<Record<TransactionPayment, any>> = {
  [TransactionPayment.CREDIT_CARD]: CreditCardIcon,
  [TransactionPayment.PIX]: PixIcon,
  [TransactionPayment.BANK_SLIP]: BarcodeIcon,
  [TransactionPayment.DEBIT_CARD]: DebitCardIcon,
  [TransactionPayment.CASH]: BanknoteIcon,
  [TransactionPayment.BANK_TRANSFER]: LandmarkIcon,
} as const;

const PAYMENT_ICON_SIZES: Partial<Record<TransactionPayment, number>> = {
  [TransactionPayment.PIX]: 24,
  [TransactionPayment.CASH]: 22,
};

const TRANSACTION_COLORS = {
  [TransactionType.DEPOSIT]: "#60c830",
  [TransactionType.EXPENSE]: "#e93030",
  [TransactionType.INVESTMENT]: "#d5d5d5",
} as const;

export const TransactionIcon = ({ payment, type }: TransactionIconProps) => {
  const IconComponent = PAYMENT_ICONS[payment] || BarcodeIcon;
  const size = PAYMENT_ICON_SIZES[payment] || 20;
  const color = TRANSACTION_COLORS[type] || "#d5d5d5";

  return <IconComponent size={size} color={color} />;
};
