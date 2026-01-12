import { Category, TransactionPayment } from '@/@types/ITransaction';
import s from './_modal-filter.module.scss';
import { Dropdown } from '@/components/ui/dropdown/dropdown';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button/button';

interface IModalFilterProps {
  selectedCategory: Category | '';
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | ''>>;
  selectedMethodPayment: TransactionPayment | '';
  setSelectedMethodPayment: React.Dispatch<
    React.SetStateAction<TransactionPayment | ''>
  >;
  onClose: () => void;
  onClear: () => void;
  onConfirm: () => void;
}

export const ModalFilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedMethodPayment,
  setSelectedMethodPayment,
  onClose,
  onClear,
  onConfirm,
}: IModalFilterProps) => {
  return (
    <div className={s.modal__filter__container}>
      <div className={s.modal__filter__header}>
        <strong>Filtros</strong>
        <button type="button" onClick={onClose}>
          <XIcon size={18} color="#ffffff" />
        </button>
      </div>

      <div className={s.filters__container}>
        <Dropdown
          classNameWrapper={s.dropdown__custom}
          options={[
            { label: 'Todas categorias', value: '' },
            { label: 'Transporte', value: Category.TRANSPORTATION },
            { label: 'Entretenimento', value: Category.ENTERTAINMENT },
            { label: 'Educação', value: Category.EDUCATION },
            { label: 'Moradia', value: Category.HOUSING },
            { label: 'Utilidades', value: Category.UTILITY },
            { label: 'Saúde', value: Category.HEALTH },
            { label: 'Salário', value: Category.SALARY },
            { label: 'Alimentação', value: Category.FOOD },
            { label: 'Outro', value: Category.OTHER },
          ]}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value as Category | '')}
          label="Categoria"
          placeholder="Filtrar por categoria"
        />

        <Dropdown
          classNameWrapper={s.dropdown__custom}
          options={[
            {
              value: TransactionPayment.PIX,
              label: 'PIX',
            },
            {
              value: TransactionPayment.CASH,
              label: 'Dinheiro',
            },
            {
              value: TransactionPayment.CREDIT_CARD,
              label: 'Cartão de Crédito',
            },
            {
              value: TransactionPayment.DEBIT_CARD,
              label: 'Cartão de Débito',
            },
            {
              value: TransactionPayment.BANK_TRANSFER,
              label: 'Transferência bancária',
            },
            {
              value: TransactionPayment.BANK_SLIP,
              label: 'Comprovante bancário',
            },
            {
              value: TransactionPayment.OTHER,
              label: 'Outro',
            },
          ]}
          value={selectedMethodPayment}
          onChange={(value) =>
            setSelectedMethodPayment(value as TransactionPayment | '')
          }
          label="Método de pagamento"
          placeholder="Método"
        />
      </div>

      <div className={s.modal__filter__footer}>
        <Button variant="cancel" type="button" onClick={onClear}>
          Limpar
        </Button>

        <Button variant="default" type="button" onClick={onConfirm}>
          Filtrar
        </Button>
      </div>
    </div>
  );
};
