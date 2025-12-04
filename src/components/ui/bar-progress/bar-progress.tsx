import { formatCurrencyBR } from "@/utils/format-currency";
import s from "./_bar-progress.module.scss";

interface IBarProgressProps {
  title: string;
  percentage: number;
  value: number;
}

export const BarProgress = ({
  title,
  percentage,
  value,
}: IBarProgressProps) => {
  return (
    <div className={s.bar__progress__container}>
      <div className={s.header}>
        <span className={s.title}>{title}</span>
        <span className={s.percentage}>{percentage}%</span>
      </div>

      <div className={s.bar__progress}>
        <div className={s.progress__fill} style={{ width: `${percentage}%` }} />
      </div>
      <span className={s.value}>{formatCurrencyBR(value)}</span>
    </div>
  );
};
