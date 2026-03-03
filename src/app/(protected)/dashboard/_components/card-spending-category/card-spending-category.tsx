'use client';

import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import s from './_card-category.module.scss';
import { useTransactions } from '@/hooks/use-transactions';
import { getCategoryLabel } from '@/app/(protected)/transacoes/_constants';
import { Category } from '@/@types/ITransaction';
import { useLoading } from '@/hooks/use-loading';
import { Skeleton } from '@/components/ui/loading/skeleton-pulse/skeleton-pulse';

export const CardSpendingCategory = () => {
  const { totalsByCategory, grandTotal } = useTransactions();
  const loading = useLoading(true, 1000);
  const isEmpty = Object.entries(totalsByCategory).length === 0;

  return (
    <div
      className={`${s.card__spending__category__container} ${isEmpty && s.card__empty}`}
    >
      <div className={s.sub__header}>
        <strong>Gastos por categoria</strong>
      </div>

      <div className={s.bars__progress}>
        {loading ? (
          <div className={s.bars__loading}>
            <Skeleton type="title" width={'100%'} />
            <Skeleton type="title" width={'100%'} />
          </div>
        ) : (
          Object.entries(totalsByCategory).map(([category, data]) => {
            const percentage = Math.round((data.total / grandTotal) * 100);

            return (
              <BarProgress
                key={category}
                title={getCategoryLabel(category as Category)}
                percentage={percentage}
                value={data.total}
              />
            );
          })
        )}

        {isEmpty && !loading && (
          <span className={s.transactions__empty}>Nenhum gasto encontrado</span>
        )}
      </div>
    </div>
  );
};
