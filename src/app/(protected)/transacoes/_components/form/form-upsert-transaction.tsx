import { Controller, useForm } from 'react-hook-form';
import { useTransactions } from '@/hooks/use-transactions';
import {
  Category,
  ITransaction,
  TransactionPayment,
  TransactionType,
} from '@/@types/ITransaction';
import s from './_form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ITransactionFormSchema,
  transactionFormSchema,
} from '@/validations/transaction-form-schema';
import { Input } from '@/components/ui/input/input';
import { ModalBackground } from '@/components/ui/modal-background';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button/button';
import { Dropdown } from '@/components/ui/dropdown/dropdown';

import { InputDate } from '@/components/ui/input/input-date/input-date';

interface IFormUpsertTransactionProps {
  onClose: () => void;
  onSave: () => void;
  transaction?: ITransaction | null;
}

export const FormUpsertTransaction = ({
  onClose,
  onSave,
  transaction,
}: IFormUpsertTransactionProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: transaction ? transaction.name : '',
      amount: transaction ? transaction.amount.toString() : '',
      category: transaction ? String(transaction.category) : ('OTHER' as any),
      transactionType: transaction
        ? String(transaction.type)
        : ('DEPOSIT' as any),
      payment: transaction ? String(transaction.payment) : ('CASH' as any),

      date: transaction ? transaction.created_at : '',
    },
    mode: 'onChange',
  });

  const { addTransaction, editTransaction } = useTransactions();

  const onSubmit = (data: ITransactionFormSchema) => {
    if (transaction) {
      const newTransaction: ITransaction = {
        ...transaction,
        name: data.name,
        amount: parseFloat(data.amount),
        type: TransactionType[
          data.transactionType as keyof typeof TransactionType
        ],
        category: Category[data.category as keyof typeof Category],
        payment:
          TransactionPayment[data.payment as keyof typeof TransactionPayment],
        created_at: data.date,
      };
      editTransaction(newTransaction);
    } else {
      const transaction: Omit<
        import('@/@types/ITransaction').ITransaction,
        'id'
      > = {
        name: data.name,
        amount: parseFloat(data.amount),
        type: TransactionType[
          data.transactionType as keyof typeof TransactionType
        ],
        category: Category[data.category as keyof typeof Category],
        payment:
          TransactionPayment[data.payment as keyof typeof TransactionPayment],
        created_at: data.date,
      };
      addTransaction(transaction);
    }

    onSave();
  };

  return (
    <ModalBackground>
      <Modal.Root className={s.modal__root__custom} onClose={onClose}>
        <Modal.Header
          title={transaction ? 'Editar transação' : 'Nova transação'}
          onClose={onClose}
        />

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.form__inputs}>
            <Input
              label="Título"
              placeholder="Digite o titulo"
              {...register('name')}
              error={errors.name}
            />
            <Input
              label="Valor"
              placeholder="Digite o valor"
              {...register('amount')}
              error={errors.amount}
            />

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

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <InputDate
                  {...field}
                  label="Data"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.date}
                />
              )}
            />
          </div>

          <div className={s.footer__form}>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="default" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
