'use client';

import { useState } from 'react';

export const useModalState = <TActiveModal, TPendingAction>() => {
  const [activeModal, setActiveModal] = useState<TActiveModal | null>(null);
  const [pendingAction, setPendingAction] = useState<TPendingAction | null>(
    null,
  );
  const [showWaiting, setShowWaiting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleOpenActiveSheet = (sheetType: any, action?: TPendingAction) => {
    setActiveModal(sheetType);
    setPendingAction(action || null);
  };

  const handleSuccess = (action: TPendingAction) => {
    setPendingAction(action);
    setShowSuccess(true);
    setActiveModal(null);
  };

  const handleRequestClose = () => setShowConfirm(true);

  const handleConfirmAction = (confirmed: boolean) => {
    setShowConfirm(false);
    if (confirmed) setActiveModal(null);
  };

  return {
    activeModal,
    setActiveModal: setActiveModal as (modal: TActiveModal | null) => void,
    pendingAction,
    setPendingAction: setPendingAction as (
      action: TPendingAction | null,
    ) => void,
    showSuccess,
    setShowSuccess,
    showConfirm,
    setShowConfirm,
    showWaiting,
    setShowWaiting,
    handleSuccess,
    handleOpenActiveSheet,
    handleRequestClose,
    handleConfirmAction,
  };
};
