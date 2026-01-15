'use client';

import { EyeIcon, EyeOffIcon, PlusIcon, WalletIcon } from 'lucide-react';
import s from './_card-balance.module.scss';
import { useEffect, useState } from 'react';
import { ModalBalance } from '../modal-balance/modal-balance';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useTransactions } from '@/hooks/use-transactions';
import { formatCurrencyBR } from '@/utils/format-currency';

export const CardBalance = () => {
  const { balance, handleAddBalance } = useTransactions();
  const [tempBalance, setTempBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleBalance, setIsVisibleBalance] = useState<boolean>(false);
  const {
    showSuccess,
    setShowSuccess,
    activeModal,
    setActiveModal,
    setShowConfirm,
    showConfirm,
  } = useModalState<string, string>();

  useEffect(() => {
    if (tempBalance !== null) {
      setError(null);
    }
  }, [tempBalance]);

  const handleOpenDialogConfirm = (value: number) => {
    if (value <= 0) {
      setError('O valor deve ser maior que zero.');
      return;
    }

    setTempBalance(value);
    setShowConfirm(true);
    setActiveModal(null);
  };

  const handleConfirmBalance = () => {
    if (tempBalance !== null) {
      handleAddBalance(tempBalance);
    }
    setShowConfirm(false);
    setShowSuccess(true);
    setTempBalance(null);
  };

  return (
    <>
      <div className={s.card__balance__container}>
        <div className={s.balance__wrapper}>
          <div className={s.card__header}>
            <div className={s.label}>
              <div className={s.icon__container}>
                <WalletIcon size={20} />
              </div>
              <p>Saldo</p>
            </div>

            <button
              type="button"
              className={s.button__add}
              onClick={() => setActiveModal('wallet')}
            >
              <PlusIcon size={16} />
            </button>
          </div>

          <div className={s.value__container}>
            <h2>
              {isVisibleBalance
                ? [1, 2, 3, 4, 5].map((index) => <span key={index}></span>)
                : formatCurrencyBR(balance)}
            </h2>
            {isVisibleBalance ? (
              <EyeIcon
                size={24}
                className={s.icon}
                onClick={() => setIsVisibleBalance(false)}
              />
            ) : (
              <EyeOffIcon
                size={24}
                className={s.icon}
                onClick={() => setIsVisibleBalance(true)}
              />
            )}
          </div>
        </div>
      </div>

      {activeModal === 'wallet' && (
        <ModalBalance
          tempBalance={tempBalance}
          error={error}
          setTempBalance={setTempBalance}
          onClose={() => {
            setActiveModal(null);
            setError(null);
            setTempBalance(null);
          }}
          onConfirm={handleOpenDialogConfirm}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
          textButton="Continuar"
          description="Saldo adicionado com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}

      {showConfirm && (
        <DialogConfirm
          information="Ao confirmar essa ação, o valor será adicionado ao seu saldo."
          title="Atenção!"
          textButtonConfirm="Confirmar"
          onCancel={() => {
            setShowConfirm(false);
            setError(null);
            setTempBalance(null);
          }}
          onConfirm={handleConfirmBalance}
        />
      )}
    </>
  );
};
