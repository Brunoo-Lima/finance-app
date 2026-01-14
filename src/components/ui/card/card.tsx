import { ReactNode } from 'react';
import s from './_card.module.scss';
import { formatCurrencyBR } from '@/utils/format-currency';

interface ICardProps {
  icon?: ReactNode;
  text?: string;
  amount?: number;
  percentage?: number;
  backgroundCustom?: string;
  backgroundIcon?: string;
}

export const Card = ({
  icon,
  text,
  amount,
  backgroundCustom,
  backgroundIcon,
  percentage,
}: ICardProps) => {
  return (
    <div
      className={`${s.card__container}`}
      style={{ backgroundColor: backgroundCustom }}
    >
      <div className={s.text__container}>
        {icon && (
          <div
            className={s.icon__container}
            style={{ backgroundColor: backgroundIcon }}
          >
            {icon}
          </div>
        )}
        <p>{text}</p>
      </div>

      {amount !== undefined && (
        <h3>{amount === 0 ? 'R$ 0,00' : formatCurrencyBR(amount)}</h3>
      )}
      {percentage && <h3>{percentage}%</h3>}
    </div>
  );
};
