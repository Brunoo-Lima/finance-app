import { formatCurrencyBR } from "@/utils/format-currency";
import s from "./_bar-progress2.module.scss";

interface IBarProgress2Props {
  title: string;
  percentage: number;
  value?: number;
  valueTotal?: number;
}

export const BarProgress2 = ({
  title,
  percentage,
  value,
  valueTotal,
}: IBarProgress2Props) => {
  return (
    <div className={s.bar__progress__container}>
      <div className={s.header}>
        <span className={s.title}>{title}</span>

        <p className={s.total}>
          {value && <span>{formatCurrencyBR(value)}</span>}
          {valueTotal && <span>/ {formatCurrencyBR(valueTotal)}</span>}
        </p>
      </div>

      <div className={s.bar__progress}>
        <div className={s.progress__fill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
