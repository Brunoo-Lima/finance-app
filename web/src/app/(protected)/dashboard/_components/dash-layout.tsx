import { Transactions } from './transactions/transactions';
import s from './_dash.module.scss';
import { CardBalance } from './card-balance/card-balance';
import { CardPieChart } from './card-pie-chart/card-pie-chart';
import { CardSpendingCategory } from './card-spending-category/card-spending-category';
import { StatsCards } from '../../transacoes/_components/stats-cards/stats-cards';
import { CardGoals } from './card-goals/card-goals';
import { CardLineChart } from './card-line-chart/card-line-chart';

export const DashLayout = () => {
  return (
    <div className={s.dash__wrapper}>
      <div className={s.cards__wrapper}>
        <CardBalance />
        <StatsCards />
      </div>

      <div className={s.management}>
        <div className={s.charts__container}>
          <CardPieChart />
          <CardLineChart />
        </div>

        <Transactions />
      </div>

      <div className={s.cards__resumes}>
        {/* <CardNextAccounts /> */}
        <CardGoals />
        <CardSpendingCategory />
        {/* <CardBudget /> */}
      </div>
    </div>
  );
};
