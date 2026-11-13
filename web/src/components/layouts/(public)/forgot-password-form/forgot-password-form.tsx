'use client';

import { useForm } from 'react-hook-form';
import s from './_forgot-password.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Input from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useRouter } from 'next/navigation';
import {
  forgotPasswordFormSchema,
  IForgotPasswordFormSchema,
} from '@/validations/password-form-schema';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { showSuccess, setShowSuccess, showConfirm, setShowConfirm } =
    useModalState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: IForgotPasswordFormSchema) => {
    console.log(data);

    try {
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input.Root>
          <Input.Label>E-mail</Input.Label>
          <Input.FormField
            type="email"
            placeholder="Digite o email"
            {...register('email')}
          />
          <Input.ErrorMessage message={errors.email?.message} />
        </Input.Root>
        <Button
          className={s.form__button}
          type="submit"
          disabled={isSubmitting}
          variant="default"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {showConfirm && (
        <DialogConfirm
          information={errors.root?.message || ''}
          textButtonConfirm="Tentar novamente"
          onCancel={() => {
            setShowConfirm(false);
          }}
          onConfirm={() => {
            setShowConfirm(false);
          }}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          description="Enviamos um e-mail com as instruções para recuperação de senha."
          onConfirm={() => {
            setShowSuccess(false);
            router.push('/esqueci-senha/nova-senha');
          }}
        />
      )}
    </>
  );
};
