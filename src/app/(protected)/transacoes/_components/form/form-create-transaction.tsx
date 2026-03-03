import { Controller, useForm } from 'react-hook-form';
import { useTransactions } from '@/hooks/use-transactions';
import {
  Category,
  TransactionPayment,
  TransactionType,
} from '@/@types/ITransaction';
import s from './_form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ITransactionFormSchema,
  transactionFormSchema,
} from '@/validations/transaction-form-schema';
import * as Input from '@/components/ui/input/input';
import { ModalBackground } from '@/components/ui/modal-background';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button/button';
import { Dropdown } from '@/components/ui/dropdown/dropdown';

import { formatCurrencyInput, parseCurrency } from '@/utils/format-currency';
import {
  formatDateInput,
  isValidDateInput,
  parseDateInput,
} from '@/utils/format-date';
import { toast } from 'sonner';

interface IFormCreateTransactionProps {
  onClose: () => void;
  onSave: () => void;
}

export const FormCreateTransaction = ({
  onClose,
  onSave,
}: IFormCreateTransactionProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<ITransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: '',
      amount: '',
      category: 'EDUCATION',
      transactionType: 'DEPOSIT',
      payment: 'BANK_SLIP',
      date: '',
    },
    mode: 'onChange',
  });

  const { addTransaction } = useTransactions();

  const amountWatch = watch('amount');
  const dateWatch = watch('date');
  const isDateValid = isValidDateInput(dateWatch);

  const isValidSubmit = () => {
    let isValid = true;

    if (!amountWatch || parseCurrency(amountWatch) === 0) {
      setError('amount', {
        message: 'O valor deve ser maior que zero',
      });
      isValid = false;
    } else {
      clearErrors('amount');
    }

    return isValid;
  };

  const handleInputValueNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    e.target.value = formatted;
  };

  const onSubmit = (data: ITransactionFormSchema) => {
    if (!isValidSubmit()) return;

    try {
      const updatedData = {
        ...data,
        name: data.name,
        amount: parseCurrency(data.amount),
        type: TransactionType[
          data.transactionType as keyof typeof TransactionType
        ],
        category: Category[data.category as keyof typeof Category],
        payment:
          TransactionPayment[data.payment as keyof typeof TransactionPayment],
        created_at: parseDateInput(data.date) as any,
      };

      addTransaction(updatedData);
      onSave();
    } catch (error) {
      toast.error('Erro ao criar transação.');
    }
  };

  return (
    <ModalBackground>
      <Modal.Root className={s.modal__root__custom} onClose={onClose}>
        <Modal.Header title="Nova transação" onClose={onClose} />

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Modal.Content className={s.modal__content}>
            <Input.Root>
              <Input.Label>Título</Input.Label>
              <Input.FormField
                placeholder="Digite o titulo"
                {...register('name')}
              />
              <Input.ErrorMessage message={errors.name?.message} />
            </Input.Root>

            <Input.Root>
              <Input.Label>Valor</Input.Label>
              <Input.FormField
                placeholder="Digite o valor"
                {...register('amount', {
                  onChange: handleInputValueNumber,
                })}
              />
              <Input.ErrorMessage message={errors.amount?.message} />
            </Input.Root>

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Dropdown
                  label="Categoria"
                  {...field}
                  options={[
                    {
                      label: 'Transporte',
                      value: 'TRANSPORTATION',
                    },
                    {
                      label: 'Entretenimento',
                      value: 'ENTERTAINMENT',
                    },
                    {
                      label: 'Educação',
                      value: 'EDUCATION',
                    },
                    {
                      label: 'Moradia',
                      value: 'HOUSING',
                    },
                    {
                      label: 'Utilidades',
                      value: 'UTILITY',
                    },
                    {
                      label: 'Saúde',
                      value: 'HEALTH',
                    },
                    {
                      label: 'Alimentação',
                      value: 'FOOD',
                    },
                    {
                      label: 'Salário',
                      value: 'SALARY',
                    },
                    {
                      label: 'Carro',
                      value: 'CAR',
                    },
                    {
                      label: 'Trabalho',
                      value: 'WORK',
                    },
                    {
                      label: 'Outro',
                      value: 'OTHER',
                    },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione"
                />
              )}
            />

            <Controller
              control={control}
              name="transactionType"
              render={({ field }) => (
                <Dropdown
                  label="Tipo da transação"
                  {...field}
                  options={[
                    {
                      label: 'Depósito',
                      value: 'DEPOSIT',
                    },
                    {
                      label: 'Despesa',
                      value: 'EXPENSE',
                    },
                    {
                      label: 'Investimento',
                      value: 'INVESTMENT',
                    },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione"
                />
              )}
            />

            <Controller
              control={control}
              name="payment"
              render={({ field }) => (
                <Dropdown
                  label="Método de pagamento"
                  {...field}
                  options={[
                    {
                      label: 'Dinheiro',
                      value: 'CASH',
                    },
                    {
                      label: 'Pix',
                      value: 'PIX',
                    },
                    {
                      label: 'Cartão de Crédito',
                      value: 'CREDIT_CARD',
                    },
                    {
                      label: 'Cartão de Débito',
                      value: 'DEBIT_CARD',
                    },
                    {
                      label: 'Transferência bancária',
                      value: 'BANK_TRANSFER',
                    },
                    {
                      label: 'Comprovante bancário',
                      value: 'BANK_SLIP',
                    },
                    { label: 'Outro', value: 'OTHER' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione"
                />
              )}
            />

            <Input.Root>
              <Input.Label>Data de validade</Input.Label>
              <Input.FormField
                type="text"
                placeholder="dd/mm/aaaa"
                {...register('date', {
                  onChange: (e) => {
                    e.target.value = formatDateInput(e.target.value);
                  },
                })}
              />
              <Input.ErrorMessage message={errors.date?.message} />

              {isDateValid === false && (
                <Input.ErrorMessage message="Data inválida" />
              )}
            </Input.Root>
          </Modal.Content>

          <Modal.Footer className={s.modal__footer}>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="default" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
