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
import { toast } from 'sonner';
import { categoryListSelect } from '@/utils/category-list';
import { transactionTypeList } from '@/utils/transaction-type-list';
import { paymentList } from '@/utils/payment-list';
import { DatePicker } from '@/components/ui/date-picker/date-picker';
import { format } from 'date-fns';

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
      date: new Date(),
    },
    mode: 'onChange',
  });

  const { addTransaction } = useTransactions();

  const amountWatch = watch('amount');

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
        created_at: format(data.date, 'dd/MM/yyyy'),
        date: format(data.date, 'dd/MM/yyyy'),
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

            <div>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Dropdown
                    label="Categoria"
                    {...field}
                    options={categoryListSelect}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione"
                  />
                )}
              />
              {errors.category && (
                <small className={s.error__message}>
                  {errors.category.message}
                </small>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name="transactionType"
                render={({ field }) => (
                  <Dropdown
                    label="Tipo da transação"
                    {...field}
                    options={transactionTypeList}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione"
                  />
                )}
              />
              {errors.transactionType && (
                <small className={s.error__message}>
                  {errors.transactionType.message}
                </small>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name="payment"
                render={({ field }) => (
                  <Dropdown
                    label="Método de pagamento"
                    {...field}
                    options={paymentList}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione"
                  />
                )}
              />
              {errors.payment && (
                <small className={s.error__message}>
                  {errors.payment.message}
                </small>
              )}
            </div>

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  label="Data final"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione uma data"
                />
              )}
            />
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
