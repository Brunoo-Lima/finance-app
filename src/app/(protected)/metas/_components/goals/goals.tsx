'use client';

import s from './_goals.module.scss';
import { BarProgress } from '@/components/ui/bar-progress/bar-progress';
import { CardGoals } from './card-goals/card-goals';
import { useModalState } from '@/hooks/use-modal-state';
import { useGoals } from '@/hooks/use-goals';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { FormUpsertGoal } from '../form-upsert-goal/form-upsert-goal';
import { DialogDelete } from './dialogs/dialog-delete';
import { successMessage } from '../_constants';
import { DialogComplete } from './dialogs/dialog-complete';
import { formatCurrencyBR } from '@/utils/format-currency';
import { IGoalData } from '@/@types/IGoal';

export type IModalType = 'update' | 'delete' | 'complete';
export type IActionType = 'update' | 'delete' | 'complete';

export const Goals = () => {
  const {
    selectedGoal,
    setSelectedGoal,
    setSelectedGoalId,
    allGoals,
    totalAchieved,
    totalOverall,
    deleteGoal,
    selectedGoalId,
    completeGoal,
  } = useGoals();
  const {
    activeModal,
    setActiveModal,
    showSuccess,
    setShowSuccess,
    handleOpenActiveSheet,
    pendingAction,
  } = useModalState<IModalType, IActionType>();

  const handleEditGoal = (goal: IGoalData) => {
    setSelectedGoal(goal as any);
    handleOpenActiveSheet('update', 'update');
  };

  const handleSave = () => {
    setShowSuccess(true);
    setActiveModal(null);
  };

  const handleOpenConfirmDialogDelete = (id: number) => {
    setSelectedGoalId(id);
    handleOpenActiveSheet('delete', 'delete');
  };

  const handleOpenConfirmDialogComplete = (id: number) => {
    setSelectedGoalId(id);
    handleOpenActiveSheet('complete', 'complete');
  };

  const handleDelete = () => {
    deleteGoal(selectedGoalId as number);
    setActiveModal(null);
    setShowSuccess(true);
  };

  const handleComplete = () => {
    if (selectedGoalId) {
      completeGoal(selectedGoalId);
    }

    setActiveModal(null);
    setShowSuccess(true);
  };

  const isEmptyListGoals = allGoals.length === 0;

  return (
    <>
      <div className={s.goals__container}>
        <div className={s.card__custom__container}>
          <strong>Progresso Geral</strong>

          <BarProgress
            title={`${formatCurrencyBR(totalAchieved)} de ${formatCurrencyBR(
              totalOverall,
            )}`}
            percentage={Math.round((totalAchieved / totalOverall) * 100) || 0}
            backgroundProgress="#60c830"
          />
        </div>

        <div className={s.goals__list}>
          <h2>Metas</h2>

          {allGoals.map((goal) => {
            const percentage =
              Math.round((goal.valueAchieved / goal.valueTotal) * 100) || 0;

            return (
              <CardGoals
                key={goal.id}
                goal={goal}
                percentage={percentage}
                onEdit={handleEditGoal}
                onDelete={handleOpenConfirmDialogDelete}
                onComplete={handleOpenConfirmDialogComplete}
              />
            );
          })}

          {isEmptyListGoals && (
            <p style={{ color: '#d5d5d5' }}>
              Você ainda não possui metas cadastradas.
            </p>
          )}
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

      {activeModal === 'delete' && (
        <DialogDelete
          onConfirm={handleDelete}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'complete' && (
        <DialogComplete
          onConfirm={handleComplete}
          onClose={() => setActiveModal(null)}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          description={successMessage[pendingAction as IActionType]}
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
