'use client';

import { FormUpsertTransaction } from '@/app/(protected)/transacoes/_components/form/form-upsert-transaction';
import { ArrowUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';

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
        <FormUpsertTransaction
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
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
