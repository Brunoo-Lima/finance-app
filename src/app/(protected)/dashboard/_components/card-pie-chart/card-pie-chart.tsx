'use client';

import dynamic from 'next/dynamic';
import s from './_card-pie.module.scss';
import { useTransactions } from '@/hooks/use-transactions';
import { useLoading } from '@/hooks/use-loading';
import Loading from '@/components/ui/loading/loading';

const PieChartCustom = dynamic(
  () => import('@/components/ui/charts/pie-chart/pie-chart-custom'),
  { ssr: false, loading: () => <Loading size={32} /> },
);

export const CardPieChart = () => {
  const { allTransactions, investmentBalance, revenueBalance, expenseBalance } =
    useTransactions();
  const loading = useLoading(true, 1000);

  const total = revenueBalance + expenseBalance + investmentBalance;

  const data = [
    {
      name: 'Ganhos',
      value: revenueBalance,
      fill: '#39be00',
    },
    {
      name: 'Gastos',
      value: expenseBalance,
      fill: '#EF4444',
    },
    {
      name: 'Investimentos',
      value: investmentBalance,
      fill: '#ffffff',
    },
  ];

  const revenuePercentage =
    total > 0 ? Math.round((revenueBalance / total) * 100) : 0;
  const expensePercentage =
    total > 0 ? Math.round((expenseBalance / total) * 100) : 0;
  const investmentPercentage =
    total > 0 ? Math.round((investmentBalance / total) * 100) : 0;

  const isEmpty = allTransactions.length === 0;

  if (isEmpty) {
    return (
      <div className={`${s.card__pie__chart_container} ${s.card__empty}`}>
        <div className={s.chart__container}>
          <span>Não há dados</span>
        </div>
      </div>
    );
  }

  return (
    <div className={s.card__pie__chart_container}>
      <div className={s.chart__container}>
        <PieChartCustom data={data} />
      </div>

      <div className={s.legend}>
        <ul>
          <li>
            <p>
              <span className={s.dot} style={{ background: '#39be00' }} />
              Ganhos
            </p>
            <b>{revenuePercentage}%</b>
          </li>
          <li>
            <p>
              <span className={s.dot} style={{ background: '#EF4444' }} />
              Gastos
            </p>
            <b>{expensePercentage}%</b>
          </li>
          <li>
            <p>
              <span className={s.dot} style={{ background: '#ffffff' }} />
              Investimentos
            </p>
            <b>{investmentPercentage}%</b>
          </li>
        </ul>
      </div>
    </div>
  );
};
