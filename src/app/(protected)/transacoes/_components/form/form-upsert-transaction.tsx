import { useForm } from "react-hook-form";
import s from "./_form.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ITransactionFormSchema,
  transactionFormSchema,
} from "@/validations/transaction-form-schema";
import { Input } from "@/components/ui/input/input";
import { ModalBackground } from "@/components/ui/modal-background";
import { Modal } from "@/components/ui/modal";

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

        <Modal.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Título" />
            <Input label="Valor" />
          </form>
        </Modal.Content>
      </Modal.Root>
    </ModalBackground>
  );
};
