'use client';

import { Button } from '@/components/ui/button/button';
import s from './_clear-data.module.scss';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { useRouter } from 'next/navigation';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';

export const ClearData = () => {
  const router = useRouter();
  const {
    showSuccess,
    setShowSuccess,
    showConfirm,
    setShowConfirm,
    setPendingAction,
    pendingAction,
  } = useModalState<string, 'delete-account' | 'clear-data'>();

  const handleDeleteAccount = () => {
    setPendingAction('delete-account');
    setShowConfirm(true);
  };

  const handleClearData = () => {
    setPendingAction('clear-data');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);

    if (pendingAction === 'delete-account') {
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  return (
    <>
      <p>
        Ao limpar seus dados, todos os seus dados serão excluídos
        permanentemente.
      </p>
      <Button variant="ghost" onClick={handleClearData}>
        Limpar dados
      </Button>

      <p>Ao limpar seus dados, você perderá o acesso à sua conta.</p>
      <Button
        variant="outline"
        className={s.button__delete}
        onClick={handleDeleteAccount}
      >
        Excluir conta
      </Button>

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
          textButton="Continuar"
          description={
            pendingAction === 'delete-account'
              ? 'Conta excluída com sucesso!'
              : 'Dados excluídos com sucesso!'
          }
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}

      {showConfirm && (
        <DialogConfirm
          title="Atenção!"
          information={
            pendingAction === 'delete-account'
              ? 'Tem certeza que deseja excluir sua conta? Sua conta será excluída permanentemente.'
              : 'Tem certeza que deseja limpar seus dados? Os seus dados serão excluídos permanentemente.'
          }
          textButtonConfirm="Continuar"
          onCancel={() => {
            setShowConfirm(false);
          }}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};
