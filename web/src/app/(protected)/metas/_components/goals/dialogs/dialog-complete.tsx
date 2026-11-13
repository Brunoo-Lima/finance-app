import { Button } from '@/components/ui/button/button';
import s from './_dialog.module.scss';
import { ModalBackground } from '@/components/ui/modal-background';

interface IDialogCompleteProps {
  onConfirm: () => void;
  onClose: () => void;
}

export const DialogComplete = ({
  onConfirm,
  onClose,
}: IDialogCompleteProps) => {
  return (
    <ModalBackground>
      <div className={s.dialog__wrapper}>
        <strong>Tem certeza que deseja finalizar essa meta?</strong>
        <p>Ao confirmar, essa meta será finalizada permanentemente.</p>

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
