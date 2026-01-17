'use client';

import { useForm } from 'react-hook-form';
import s from './_password-form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import { useEffect } from 'react';
import {
  changePasswordFormSchema,
  IChangePasswordFormSchema,
} from '@/validations/password-form-schema';
import { InputPassword } from '@/components/ui/input/input-password/input-password';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { useModalState } from '@/hooks/use-modal-state';

export const PasswordForm = () => {
  const { showSuccess, setShowSuccess } = useModalState<string, string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // setValue('name', parsedUser.name);
      // setValue('email', parsedUser.email);
    }
  }, [setValue]);

  const onSubmit = async (data: IChangePasswordFormSchema) => {
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
          label="Senha atual"
          placeholder="Digite a senha atual"
          maxLength={6}
          {...register('currentPassword')}
          error={errors.currentPassword}
        />
        <InputPassword
          label="Nova senha"
          placeholder="Digite a nova senha"
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
          className={s.button}
          variant="default"
          type="submit"
          disabled={isSubmitting}
        >
          Atualizar senha
        </Button>
      </form>

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
          textButton="Continuar"
          description="A senha foi alterada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
