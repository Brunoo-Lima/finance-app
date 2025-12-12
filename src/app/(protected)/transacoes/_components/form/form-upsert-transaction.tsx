import { Controller, useForm } from "react-hook-form";
import { useTransactions } from "@/hooks/use-transactions";
import {
  Category,
  TransactionPayment,
  TransactionType,
} from "@/@types/ITransaction";
import s from "./_form.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ITransactionFormSchema,
  transactionFormSchema,
} from "@/validations/transaction-form-schema";
import { Input } from "@/components/ui/input/input";
import { ModalBackground } from "@/components/ui/modal-background";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button/button";
import { Dropdown } from "@/components/ui/dropdown/dropdown";

import { InputDate } from "@/components/ui/input/input-date/input-date";

interface IFormUpsertTransactionProps {
  onClose: () => void;
}

export const FormUpsertTransaction = ({
  onClose,
}: IFormUpsertTransactionProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: "",
      amount: "",
      transactionType: "DEPOSIT",
      payment: "CASH",
      date: "",
    },
    mode: "onChange",
  });

  const { addTransaction } = useTransactions();

  const onSubmit = (data: ITransactionFormSchema) => {
    // Map string values to enums
    const transaction: Omit<
      import("@/@types/ITransaction").ITransaction,
      "id"
    > = {
      name: data.name,
      amount: parseFloat(data.amount),
      type: TransactionType[
        data.transactionType as keyof typeof TransactionType
      ],
      payment:
        TransactionPayment[data.payment as keyof typeof TransactionPayment],
      category: Category.OTHER, // ou adicione um campo de categoria no form
      created_at: data.date,
    };
    addTransaction(transaction);
    onClose();
  };

  return (
    <ModalBackground>
      <Modal.Root className={s.modal__root__custom} onClose={onClose}>
        <Modal.Header title="Transação" onClose={onClose} />

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.form__inputs}>
            <Input
              label="Título"
              placeholder="Digite o titulo"
              {...register("name")}
              error={errors.name}
            />
            <Input
              label="Valor"
              placeholder="Digite o valor"
              {...register("amount")}
              error={errors.amount}
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
                      label: "Deposito",
                      value: "DEPOSIT",
                    },
                    {
                      label: "Despesa",
                      value: "EXPENSE",
                    },
                    {
                      label: "Investimento",
                      value: "INVESTMENT",
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
                      label: "Dinheiro",
                      value: "CASH",
                    },
                    {
                      label: "Cartão de Crédito",
                      value: "CREDIT_CARD",
                    },
                    {
                      label: "Cartão de Débito",
                      value: "DEBIT_CARD",
                    },
                    {
                      label: "Transferência bancária",
                      value: "BANK_TRANSFER",
                    },
                    {
                      label: "Comprovante bancário",
                      value: "BANK_SLIP",
                    },
                    { label: "Outro", value: "OTHER" },
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
