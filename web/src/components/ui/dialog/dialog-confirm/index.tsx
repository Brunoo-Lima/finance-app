import { XIcon } from 'lucide-react';

import { Modal } from '../../modal';
import { ModalBackground } from '../../modal-background';
import s from './_dialog-confirm.module.scss';

interface IDialogConfirmProps {
  information: string;
  title?: string;
  textButtonConfirm?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}
export const DialogConfirm = ({
  information,
  title = 'Atenção!',
  textButtonConfirm = 'Continuar',
  onCancel,
  onConfirm,
}: IDialogConfirmProps) => {
  return (
    <ModalBackground>
      <Modal.Root onClose={() => {}} className={s.dialog}>
        <Modal.Content className={s.content}>
          <div className={s.header}>
            <strong>{title}</strong>

            <XIcon size={24} className={s.icon__close} onClick={onCancel} />
          </div>

          <p>{information}</p>

          <div className={s.actions}>
            <button
              className={`${s.button} ${s.cancel}`}
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className={`${s.button} ${s.continue}`}
              type="button"
              onClick={onConfirm}
            >
              {textButtonConfirm}
            </button>
          </div>
        </Modal.Content>
      </Modal.Root>
    </ModalBackground>
  );
};
