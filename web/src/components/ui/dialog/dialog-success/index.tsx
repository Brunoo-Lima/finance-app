import { CheckIcon } from 'lucide-react';
import { Modal } from '../../modal';
import { ModalBackground } from '../../modal-background';
import s from './_dialog-success.module.scss';

interface IDialogSuccessProps {
  title?: string;
  description: string;
  textButton?: string;
  onConfirm: () => void;
}

export const DialogSuccess = ({
  title = 'Sucesso!',
  description,
  textButton = 'Continuar',
  onConfirm,
}: IDialogSuccessProps) => {
  return (
    <ModalBackground>
      <Modal.Root onClose={() => {}} className={s.dialog}>
        <Modal.Content className={s.content}>
          <CheckIcon className={s.icon} size={32} color="#ffffff" />

          <strong>{title || 'Sucesso!'}</strong>
          <p>{description}</p>

          <button
            className={`${s.button} ${s.continue}`}
            type="button"
            onClick={onConfirm}
          >
            {textButton || 'Continuar'}
          </button>
        </Modal.Content>
      </Modal.Root>
    </ModalBackground>
  );
};
