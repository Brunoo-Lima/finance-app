import { Transactions } from "./transactions/transactions";
import s from "./_dash.module.scss";
import { CardBalance } from "./card-balance/card-balance";
import { Card } from "@/components/ui/card/card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { CardPieChart } from "./card-pie-chart/card-pie-chart";
import { CardSpendingCategory } from "./card-spending-category/card-spending-category";
import { CardNextAccounts } from "./card-next-accounts/card-next-accounts";
import { CardGoals } from "./card-goals/card-goals";
import { CardBudget } from "./card-budget/card-budget";

export const DashLayout = () => {
  return (
    <div className={s.dash__wrapper}>
      <div className={s.cards__wrapper}>
        <CardBalance />
        <Card
          text="Investido"
          amount={3500}
          backgroundCustom="#171717"
          icon={<PiggyBankIcon size={16} color="#ffffff" />}
          backgroundIcon="#FFFFFF14"
        />

        <Card
          text="Receita"
          amount={8150}
          icon={<TrendingUpIcon size={16} color="#39BE00" />}
          backgroundIcon="#39BE0014"
        />
        <Card
          text="Despesas"
          amount={2950}
          icon={<TrendingDownIcon size={16} color="#E93030" />}
          backgroundIcon="#F6352E14"
        />
      </div>

      {/* <div className={s.cards__resumes}>
        <CardNextAccounts />
        <CardGoals />
        <CardBudget />
      </div> */}

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
