import { Button } from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal';
import { ModalBackground } from '@/components/ui/modal-background';
import s from './_modal-balance.module.scss';
import { Input } from '@/components/ui/input/input';

interface IModalBalanceProps {
  onClose: () => void;
  onConfirm: (value: number) => void;
  tempBalance: number | null;
  setTempBalance: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ModalBalance = ({
  onClose,
  onConfirm,
  tempBalance,
  setTempBalance,
}: IModalBalanceProps) => {
  return (
    <ModalBackground>
      <Modal.Root onClose={onClose} className={s.modal__balance}>
        <Modal.Header
          className={s.modal__header}
          title="Adicionar saldo"
          onClose={onClose}
        />
        <form onSubmit={() => {}}>
          <Modal.Content className={s.modal__content}>
            <p>Digite o valor para adicionar ao seu saldo.</p>

            <Input
              type="number"
              placeholder="R$ 0,00"
              label="Valor"
              value={tempBalance?.toString()}
              onChange={(e) => setTempBalance(parseFloat(e.target.value))}
            />
          </Modal.Content>

          <Modal.Footer className={s.modal__footer}>
            <Button variant="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={() => onConfirm(tempBalance || 0)}
            >
              Adicionar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
