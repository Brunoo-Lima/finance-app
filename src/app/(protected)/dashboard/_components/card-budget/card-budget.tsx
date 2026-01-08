import s from "./_card-budget.module.scss";
import { BarProgress2 } from "@/components/ui/bar-progress2/bar-progress2";

export const CardBudget = () => {
  return (
    <div className={s.card__container}>
      <div className={s.sub__header}>
        <p>Orçamento Mensal</p>
      </div>

      <div className={s.bars__progress}>
        <BarProgress2
          title="Alimentação"
          percentage={70}
          value={800}
          valueTotal={1000}
        />
        <BarProgress2
          title="Transporte"
          percentage={60}
          value={300}
          valueTotal={500}
        />
        <BarProgress2
          title="Lazer"
          percentage={54}
          value={280}
          valueTotal={400}
        />
      </div>
    </div>
  );
};
