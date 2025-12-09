import { ITransaction, TransactionType } from "@/@types/ITransaction";
import { formatCurrencyBR } from "@/utils/format-currency";
import { PencilIcon, Trash2Icon } from "lucide-react";

import s from "./_table.module.scss";
import {
  getCategoryLabel,
  getPaymentLabel,
  getTransactionType,
} from "../../_constants";

interface ITableRowProps {
  item: ITransaction;
}

export const TableRow = ({ item }: ITableRowProps) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <p
          className={`${s.payment__status} ${s[TransactionType[item.type].toLowerCase()]}`}
        >
          <span className={s.dot} />
          {getTransactionType(item.type)}
        </p>
      </td>
      <td>{getCategoryLabel(item.category)}</td>
      <td>{getPaymentLabel(item.payment)}</td>
      <td>{formatCurrencyBR(item.amount)}</td>
      <td>{item.created_at}</td>
      <td>
        <div className={s.td__actions}>
          <button type="button" className={s.button}>
            <PencilIcon size={20} color="#ffffff1a" />
          </button>
          <button type="button" className={s.button}>
            <Trash2Icon size={20} color="#e93030" />
          </button>
        </div>
      </td>
    </tr>
  );
};
