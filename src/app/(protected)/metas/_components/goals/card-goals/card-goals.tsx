'use client';

import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import { TargetIcon } from '@phosphor-icons/react/dist/ssr';
import s from './_card-goals.module.scss';
import { IGoal } from '@/@types/IGoal';
import { formatCurrencyBR } from '@/utils/format-currency';
import {
  CalendarIcon,
  CircleCheckBigIcon,
  SquarePenIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useGoals } from '@/hooks/use-goals';

interface ICardGoalsProps {
  goal: IGoal;
  percentage: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}
export const CardGoals = ({
  goal,
  percentage,
  onEdit,
  onDelete,
  onComplete,
}: ICardGoalsProps) => {
  const [isSeeMoreInfoDetails, setIsSeeMoreInfoDetails] =
    useState<boolean>(false);
  const { selectedGoalId, setSelectedGoalId } = useGoals();

  const handleExpandedInfo = (id: number) => {
    setIsSeeMoreInfoDetails(!isSeeMoreInfoDetails);
    setSelectedGoalId(id);
  };

  const selectedGoal = selectedGoalId === goal.id;
  const isSeeMoreInfo = selectedGoal && isSeeMoreInfoDetails;

  return (
    <div className={s.card__custom__container}>
      <div className={s.card__custom__header}>
        <div className={s.column1}>
          <strong>{goal.name}</strong>

          <div className={s.column1__bottom}>
            <div className={s.category__container}>
              <TargetIcon size={16} />
              <small>{goal.category}</small>
            </div>
            <div className={s.date__container}>
              <CalendarIcon size={16} color="#d5d5d5" />
              <small className={s.date}>{goal.dateFinal}</small>
            </div>
          </div>
        </div>

        <div className={s.column2}>
          <span className={s.value}>
            {formatCurrencyBR(goal.valueAchieved)}
          </span>
          <span> de {formatCurrencyBR(goal.valueTotal)}</span>
        </div>
      </div>

      <BarProgress
        title="Progresso"
        percentage={percentage}
        backgroundProgress="#378712"
      />

      {isSeeMoreInfo && (
        <div
          className={`${s.card__infos} ${isSeeMoreInfo ? s.active : s.closed}`}
        >
          <div className={s.row}>
            <small>Faltam</small>
            <span className={s.remaining__amount}>
              {formatCurrencyBR(goal.remainingAmount)}
            </span>
          </div>

          <div className={s.row}>
            <small>Contribuição mensal</small>
            <span className={s.monthly__contribution}>
              {formatCurrencyBR(goal.contributionMonthly)}
            </span>
          </div>

          <div className={s.row}>
            <small>Meses restantes</small>
            <span className={s.remaining__period}>
              {goal.remainingPeriod} meses
            </span>
          </div>
        </div>
      )}

      {!isSeeMoreInfo && (
        <button
          type="button"
          className={s.button__see__more}
          onClick={() => handleExpandedInfo(goal.id)}
        >
          Ver mais
        </button>
      )}

      <div className={s.card__attention}>
        <TriangleAlertIcon size={20} color="#ff8d28" />
        <span>
          Considere aumentar sua contribuição mensal para atingir a meta no
          prazo.
        </span>
      </div>

      {goal.status !== 'finalizada' ? (
        <div className={s.card__buttons}>
          <button
            type="button"
            className={s.button__finish}
            onClick={() => onComplete(goal.id)}
          >
            <CircleCheckBigIcon size={16} color="#ffffff" />
            <p>Finalizar</p>
          </button>
          <button type="button" onClick={() => onEdit(goal.id)}>
            <SquarePenIcon size={16} color="#a7a7a7" />
            <p>Editar</p>
          </button>
          <button
            type="button"
            className={s.button__delete}
            onClick={() => onDelete(goal.id)}
          >
            <Trash2Icon size={16} color="#ffffff" />
            <p>Deletar</p>
          </button>
        </div>
      ) : (
        <span className={s.finished}>Finalizada</span>
      )}
    </div>
  );
};
