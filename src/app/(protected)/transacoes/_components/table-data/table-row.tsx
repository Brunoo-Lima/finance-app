import { ITransaction } from "@/@types/ITransaction";
import { formatCurrencyBR } from "@/utils/format-currency";
import { PencilIcon, Trash2Icon } from "lucide-react";

import s from "./_table.module.scss";

interface ITableRowProps {
  item: ITransaction;
}

export const TableRow = ({ item }: ITableRowProps) => {
  return (
    <tr>
      <td>{item.description}</td>
      <td>{item.type}</td>
      <td>{item.status}</td>
      <td>{item.payment}</td>
      <td>{formatCurrencyBR(item.value)}</td>
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
