import { ITransaction } from '@/@types/ITransaction';
import { formatCurrencyBR } from '@/utils/format-currency';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';

import s from './_table.module.scss';
import {
  getCategoryLabel,
  getPaymentLabel,
  getTransactionType,
  getTransactionTypeClass,
} from '../../_constants';

interface ITableRowProps {
  item: ITransaction;
  onEdit: () => void;
}

export const TableRow = ({ item, onEdit }: ITableRowProps) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <p
          className={`${s.transaction__type} ${s[getTransactionTypeClass(item.type)]}`}
        >
          <span className={s.dot} />
          {getTransactionType(item.type)}
        </p>
      </td>
      <td>{getCategoryLabel(item.category)}</td>
      <td>{getPaymentLabel(item.payment)}</td>
      <td>
        <p
          className={`${s.transaction__type} ${s[getTransactionTypeClass(item.type)]}`}
        >
          {formatCurrencyBR(item.amount)}
        </p>
      </td>
      <td>{item.created_at}</td>
      <td>
        <div className={s.td__actions}>
          <button type="button" className={s.button} onClick={onEdit}>
            <SquarePenIcon size={20} color="#a7a7a7" />
          </button>
          <button type="button" className={s.button}>
            <Trash2Icon size={20} color="#e93030" />
          </button>
        </div>
      </td>
    </tr>
  );
};
