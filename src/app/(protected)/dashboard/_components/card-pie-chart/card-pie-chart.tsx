'use client';

import dynamic from 'next/dynamic';

import s from './_card-pie.module.scss';
import { useTransactions } from '@/hooks/use-transactions';

const PieChartCustom = dynamic(
  () => import('@/components/ui/charts/pie-chart/pie-chart-custom'),
  { ssr: false },
);

export const CardPieChart = () => {
  const { allTransactions, investmentBalance, revenueBalance, expenseBalance } =
    useTransactions();

  const total = revenueBalance + expenseBalance + investmentBalance;

  const revenuePercentage =
    total > 0 ? Math.round((revenueBalance / total) * 100) : 0;
  const expensePercentage =
    total > 0 ? Math.round((expenseBalance / total) * 100) : 0;
  const investmentPercentage =
    total > 0 ? Math.round((investmentBalance / total) * 100) : 0;

  const data = [
    {
      name: 'Ganhos',
      value: revenuePercentage,
      fill: '#39be00',
    },

    {
      name: 'Gastos',
      value: expensePercentage,
      fill: '#EF4444',
    },
    {
      name: 'Investimentos',
      value: investmentPercentage,
      fill: '#ffffff',
    },
  ];

  const isEmpty = allTransactions.length === 0;

  return (
    <div
      className={`${s.card__pie__chart_container} ${isEmpty && s.card__empty}`}
    >
      {!isEmpty ? <PieChartCustom data={data} /> : <span>Não há dados</span>}

      <div className={s.legend}>
        <ul>
          <li>
            <p>
              <span className={s.dot} style={{ background: '#39be00' }} />{' '}
              Ganhos
            </p>

            <b>{revenuePercentage}%</b>
          </li>
          <li>
            <p>
              {' '}
              <span className={s.dot} style={{ background: '#EF4444' }} />{' '}
              Gastos
            </p>

            <b>{expensePercentage}%</b>
          </li>
          <li>
            <p>
              <span className={s.dot} style={{ background: '#ffffff' }} />{' '}
              Investimentos
            </p>

            <b>{investmentPercentage}%</b>
          </li>
        </ul>
      </div>
    </div>
  );
};
