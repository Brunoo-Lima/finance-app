'use client';

import s from './_goals.module.scss';
import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import { goalsList } from '@/mocks/goals-list';
import { useState } from 'react';
import { CardGoals } from './card-goals/card-goals';
import { useModalState } from '@/hooks/use-modal-state';
import { useGoals } from '@/hooks/use-goals';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { FormUpsertGoal } from '../form-upsert-goal/form-upsert-goal';

export type IModalType = 'update';
export const Goals = () => {
  const [goals, setGoals] = useState(goalsList);
  const { selectedGoal, setSelectedGoalId } = useGoals();
  const {
    activeModal,
    setActiveModal,
    showSuccess,
    setShowSuccess,
    showConfirm,
    setShowConfirm,
    handleOpenActiveSheet,
  } = useModalState<IModalType, string>();

  const handleEditGoal = (id: number) => {
    setSelectedGoalId(id);
    setActiveModal('update');
  };

  const handleSave = () => {
    setShowSuccess(true);
    setActiveModal(null);
  };

  return (
    <>
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
              <CardGoals
                key={goal.id}
                goal={goal}
                percentage={percentage}
                onEdit={handleEditGoal}
              />
            );
          })}
        </div>
      </div>

      {activeModal === 'update' && (
        <FormUpsertGoal
          mode="update"
          selected={selectedGoal}
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          description="Meta cadastrada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
