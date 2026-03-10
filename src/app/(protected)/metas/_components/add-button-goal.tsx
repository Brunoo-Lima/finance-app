'use client';

import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { PlusIcon } from 'lucide-react';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import dynamic from 'next/dynamic';

const FormCreateGoal = dynamic(
  () => import('./form/form-create-goal').then((mod) => mod.FormCreateGoal),
  { ssr: false },
);

export const AddButtonGoal = () => {
  const {
    activeModal,
    setActiveModal,
    showSuccess,
    setShowSuccess,
    handleOpenActiveSheet,
  } = useModalState();

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
        <FormCreateGoal
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
