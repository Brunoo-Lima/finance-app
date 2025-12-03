import { Transactions } from "./transactions/transactions";
import s from "./_dash.module.scss";
import { CardBalance } from "./card-balance/card-balance";
import { Card } from "@/components/ui/card/card";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export const DashLayout = () => {
  return (
    <div className={s.dash__wrapper}>
      <div className={s.management}>
        <CardBalance />

        <div className={s.cards}>
          <Card
            text="Investido"
            amount={3500}
            backgroundCustom="#ffffff1a"
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
      </div>

      <Transactions />
    </div>
  );
};
