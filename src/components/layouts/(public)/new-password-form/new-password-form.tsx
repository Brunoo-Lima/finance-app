'use client';

import { useForm } from 'react-hook-form';
import s from './_new-password.module.scss';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useRouter } from 'next/navigation';
import { InputPassword } from '@/components/ui/input/input-password/input-password';
import {
  INewPasswordFormSchema,
  newPasswordFormSchema,
} from '@/validations/password-form-schema';

export const NewPasswordForm = () => {
  const router = useRouter();
  const { showSuccess, setShowSuccess, showConfirm, setShowConfirm } =
    useModalState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<INewPasswordFormSchema>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: INewPasswordFormSchema) => {
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
        <InputPassword
          label="Senha"
          placeholder="Digite a senha"
          maxLength={6}
          {...register('password')}
          error={errors.password}
        />

        <InputPassword
          label="Confirmação de senha"
          placeholder="Digite a confirmação de senha"
          maxLength={6}
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />

        <Button
          className={s.form__button}
          type="submit"
          disabled={isSubmitting}
          variant="default"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>

      {showConfirm && (
        <DialogConfirm
          information={errors.root?.message || ''}
          title="Atenção!"
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
          title="Sucesso!"
          textButton="Continuar"
          description="Nova senha criada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
            router.push('/');
          }}
        />
      )}
    </>
  );
};
