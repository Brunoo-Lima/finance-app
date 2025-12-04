import { BarProgress } from "@/components/ui/bar-progress/bar-progress";
import s from "./_card-category.module.scss";

export const CardSpendingCategory = () => {
  return (
    <div className={s.card__spending__category__container}>
      <div className={s.sub__header}>
        <p>Gastos por categoria</p>
      </div>

      <div className={s.bars__progress}>
        <BarProgress title="Moradia" percentage={50} value={2500} />
        <BarProgress title="Alimentação" percentage={40} value={1200} />
        <BarProgress title="Saúde" percentage={30} value={320} />
        <BarProgress title="Transporte" percentage={20} value={150} />
      </div>
    </div>
  );
};
