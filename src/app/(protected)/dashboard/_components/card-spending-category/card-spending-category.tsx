'use client';

import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import s from './_card-category.module.scss';
import { useTransactions } from '@/hooks/use-transactions';
import { getCategoryLabel } from '@/app/(protected)/transacoes/_constants';
import { Category } from '@/@types/ITransaction';

export const CardSpendingCategory = () => {
  const { totalsByCategory, grandTotal } = useTransactions();

  const isEmpty = Object.entries(totalsByCategory).length === 0;

  return (
    <div
      className={`${s.card__spending__category__container} ${isEmpty && s.card__empty}`}
    >
      <div className={s.sub__header}>
        <p>Gastos por categoria</p>
      </div>

      <div className={s.bars__progress}>
        {Object.entries(totalsByCategory).map(([category, data]) => {
          const percentage = Math.round((data.total / grandTotal) * 100);

          return (
            <BarProgress
              key={category}
              title={getCategoryLabel(category as Category)}
              percentage={percentage}
              value={data.total}
            />
          );
        })}

        {isEmpty && (
          <span className={s.transactions__empty}>
            Nenhuma transação encontrada
          </span>
        )}
      </div>
    </div>
  );
};
