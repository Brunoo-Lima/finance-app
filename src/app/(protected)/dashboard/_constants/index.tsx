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
  [TransactionType.DEPOSIT]: "oklch(0.648 0.2 131.684)",
  [TransactionType.EXPENSE]: "#E93030",
  [TransactionType.INVESTMENT]: "#B8B8B8",
} as const;

export const TransactionIcon = ({ payment, type }: TransactionIconProps) => {
  const IconComponent = PAYMENT_ICONS[payment] || BarcodeIcon;
  const size = PAYMENT_ICON_SIZES[payment] || 20;
  const color = TRANSACTION_COLORS[type] || "#B8B8B8";

  return <IconComponent size={size} color={color} />;
};
