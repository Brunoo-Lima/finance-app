import { Controller, useForm } from "react-hook-form";
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
import { DateInput } from "@/components/ui/date-picker/date-picker";

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
  });

  const onSubmit = (data: ITransactionFormSchema) => {
    console.log(data);
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
            />
            <Input
              label="Valor"
              placeholder="Digite o valor"
              {...register("amount")}
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
                  placeholder="Selecione"
                />
              )}
            />

            {/* <Controller
              control={control}
              name="date"
              render={({ field }) => <DateInput control={} {...field} />}
            /> */}

            <DateInput control={control} name="date" placeholder="Selecione" />
          </div>

          <div className={s.footer__form}>
            <Button variant="cancel" type="submit">
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
