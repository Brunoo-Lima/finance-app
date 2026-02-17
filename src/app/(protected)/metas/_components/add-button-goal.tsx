'use client';

import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { PlusIcon } from 'lucide-react';
import { FormUpsertGoal } from './form-upsert-goal/form-upsert-goal';
import { useGoals } from '@/hooks/use-goals';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';

export const AddButtonGoal = () => {
  const {
    activeModal,
    setActiveModal,
    showSuccess,
    setShowSuccess,
    showConfirm,
    setShowConfirm,
    handleOpenActiveSheet,
  } = useModalState();
  const { selectedGoal } = useGoals();

  const handleSave = () => {
    setShowSuccess(true);
    setActiveModal(null);
  };

  return (
    <>
      <Button variant="default" onClick={() => handleOpenActiveSheet('create')}>
        Nova meta
        <PlusIcon size={16} />
      </Button>

      {activeModal === 'create' && (
        <FormUpsertGoal
          mode="create"
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
