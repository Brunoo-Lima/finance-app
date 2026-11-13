import { Button } from '@/components/ui/button/button';
import { Modal } from '@/components/ui/modal';
import { ModalBackground } from '@/components/ui/modal-background';
import s from './_modal-balance.module.scss';
import * as Input from '@/components/ui/input/input';
import { formatCurrencyInput, parseCurrency } from '@/utils/format-currency';
import { useState } from 'react';

interface IModalBalanceProps {
  onClose: () => void;
  onConfirm: (value: number) => void;
  tempBalance: number | null;
  setTempBalance: React.Dispatch<React.SetStateAction<number | null>>;
  error?: string | null;
}

export const ModalBalance = ({
  onClose,
  onConfirm,
  tempBalance,
  setTempBalance,
  error,
}: IModalBalanceProps) => {
  const [displayValue, setDisplayValue] = useState(
    tempBalance ? tempBalance.toString() : '',
  );

  const handleInputValueNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setDisplayValue(formatted);

    const numeric = parseCurrency(formatted);
    setTempBalance(isNaN(numeric) ? null : numeric);
  };

  return (
    <ModalBackground>
      <Modal.Root onClose={onClose} className={s.modal__balance}>
        <Modal.Header
          className={s.modal__header}
          title="Adicionar saldo"
          onClose={onClose}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(tempBalance || 0);
          }}
        >
          <Modal.Content className={s.modal__content}>
            <p>Digite o valor para adicionar ao seu saldo.</p>

            <Input.Root>
              <Input.FormField
                type="text"
                placeholder="Digite o valor"
                value={displayValue}
                onChange={handleInputValueNumber}
              />
              <Input.ErrorMessage message={error || ''} />
            </Input.Root>
          </Modal.Content>

          <Modal.Footer className={s.modal__footer}>
            <Button variant="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="default" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
