import { Transactions } from './transactions/transactions';
import s from './_dash.module.scss';
import { CardBalance } from './card-balance/card-balance';
import { CardPieChart } from './card-pie-chart/card-pie-chart';
import { CardSpendingCategory } from './card-spending-category/card-spending-category';
import { StatsCards } from '../../transacoes/_components/stats-cards/stats-cards';
import { CardGoals } from './card-goals/card-goals';

export const DashLayout = () => {
  return (
    <div className={s.dash__wrapper}>
      <div className={s.cards__wrapper}>
        <CardBalance />
        <StatsCards />
      </div>

      <div className={s.cards__resumes}>
        {/* <CardNextAccounts /> */}
        <CardGoals />
        {/* <CardBudget /> */}
      </div>

      <div className={s.management}>
        <div className={s.charts__container}>
          <CardPieChart />
          <CardSpendingCategory />
        </div>

        <Transactions />
      </div>
    </div>
  );
};
