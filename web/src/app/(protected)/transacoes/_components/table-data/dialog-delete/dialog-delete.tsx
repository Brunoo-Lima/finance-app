import { Button } from '@/components/ui/button/button';
import s from './_dialog-delete.module.scss';
import { ModalBackground } from '@/components/ui/modal-background';

interface IDialogDeleteProps {
  onConfirm: () => void;
  onClose: () => void;
}

export const DialogDelete = ({ onConfirm, onClose }: IDialogDeleteProps) => {
  return (
    <ModalBackground>
      <div className={s.dialog__wrapper}>
        <strong>Tem certeza que deseja excluir essa transação?</strong>
        <p>Ao confirmar, essa transação será excluída permanentemente.</p>

        <div className={s.actions}>
          <Button variant="cancel" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Continuar
          </Button>
        </div>
      </div>
    </ModalBackground>
  );
};
