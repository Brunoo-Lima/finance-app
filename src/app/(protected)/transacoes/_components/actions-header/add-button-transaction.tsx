'use client';

import { ArrowUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import dynamic from 'next/dynamic';

const FormCreateTransaction = dynamic(
  () =>
    import('../form/form-create-transaction').then(
      (mod) => mod.FormCreateTransaction,
    ),
  { ssr: false },
);

export const AddButtonTransaction = () => {
  const { showSuccess, setShowSuccess, activeModal, setActiveModal } =
    useModalState();

  const handleSave = () => {
    setShowSuccess(true);
    setActiveModal(null);
  };

  return (
    <>
      <Button variant="default" onClick={() => setActiveModal('create')}>
        Adicionar Transação <ArrowUpDownIcon size={18} />
      </Button>

      {activeModal === 'create' && (
        <FormCreateTransaction
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          textButton="Continuar"
          description="Transação cadastrada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
