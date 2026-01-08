import { BarProgress } from "@/components/ui/bar-progress/bar-progress";
import s from "./_card-goals.module.scss";

export const CardGoals = () => {
  return (
    <div className={s.card__container}>
      <div className={s.sub__header}>
        <p>Metas financeiras</p>
      </div>

      <div className={s.bars__progress}>
        <BarProgress title="Viagem" percentage={50} />
        <BarProgress title="Carro Novo" percentage={28} />
        <BarProgress title="Reserva" percentage={82} />
      </div>
    </div>
  );
};
