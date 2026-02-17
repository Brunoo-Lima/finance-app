'use client';

import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import s from './_goals.module.scss';
import { goalsList } from '@/mocks/goals-list';
import { useState } from 'react';
import { CardGoals } from './card-goals/card-goals';

export const Goals = () => {
  const [goals, setGoals] = useState(goalsList);

  return (
    <div className={s.goals__container}>
      <div className={s.card__custom__container}>
        <strong>Progresso Geral</strong>

        <BarProgress
          title={'R$ 500 de R$ 1.000'}
          percentage={50}
          backgroundProgress="#60c830"
        />
      </div>

      <div className={s.goals__list}>
        <h2>Metas</h2>

        {goals.map((goal) => {
          const percentage =
            Math.round((goal.valueAchieved / goal.valueTotal) * 100) || 0;

          return (
            <CardGoals key={goal.id} goal={goal} percentage={percentage} />
          );
        })}
      </div>
    </div>
  );
};
