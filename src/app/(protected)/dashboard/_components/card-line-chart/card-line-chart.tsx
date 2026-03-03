'use client';

import { useTransactions } from '@/hooks/use-transactions';
import s from './_card-line.chart.module.scss';
import dynamic from 'next/dynamic';
import Loading from '@/components/ui/loading/loading';
import { useLoading } from '@/hooks/use-loading';

const LineChartCustom = dynamic(
  () => import('@/components/ui/charts/line-chart/line-chart-custom'),
  { ssr: false, loading: () => <Loading size={32} /> },
);
export const CardLineChart = () => {
  const { allTransactions } = useTransactions();
  const loading = useLoading(true, 1000);

  return (
    <div className={s.card__line__chart__container}>
      <strong>Quantidade de transações</strong>

      <div className={s.chart__container}>
        {allTransactions.length === 0 && !loading && (
          <span className={s.transactions__empty}>
            Nenhuma transação encontrada
          </span>
        )}

        <LineChartCustom data={allTransactions} />
      </div>
    </div>
  );
};
