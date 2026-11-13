'use client';

import { useTransactions } from '@/hooks/use-transactions';
import s from './_card-line.chart.module.scss';
import dynamic from 'next/dynamic';
import Loading from '@/components/ui/loading/loading';
import { useDashboard } from '@/hooks/use-dashboard';

const LineChartCustom = dynamic(
  () => import('@/components/ui/charts/line-chart/line-chart-custom'),
  { ssr: false, loading: () => <Loading size={32} /> },
);

export const CardLineChart = () => {
  const { allTransactions } = useTransactions();
  const { from, selectedMonth, selectedYear } = useDashboard();
  const filterMode = from === null ? 'general' : 'month';

  return (
    <div className={s.card__line__chart__container}>
      <div className={s.sub__header}>
        <strong>Quantidade de transações</strong>
      </div>

      <div className={s.line__chart__container}>
        <div className={s.chart__container}>
          <LineChartCustom
            data={allTransactions}
            year={selectedYear}
            month={selectedMonth}
            filterMode={filterMode}
          />
        </div>
      </div>
    </div>
  );
};
