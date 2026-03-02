'use client';

import { useForm } from 'react-hook-form';
import s from './_account-form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  accountFormSchema,
  IAccountFormSchema,
} from '@/validations/account-form-schema';
import * as Input from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useEffect } from 'react';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';

export const AccountForm = () => {
  const { showSuccess, setShowSuccess } = useModalState<string, string>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IAccountFormSchema>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setValue('name', parsedUser.name);
      setValue('email', parsedUser.email);
    }
  }, [setValue]);

  const onSubmit = async (data: IAccountFormSchema) => {
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
          <Input.Label>Nome</Input.Label>
          <Input.FormField placeholder="Digite o nome" {...register('name')} />
          <Input.ErrorMessage message={errors.name?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label>Nome</Input.Label>
          <Input.FormField
            type="email"
            placeholder="Digite o e-mail"
            {...register('email')}
          />
          <Input.ErrorMessage message={errors.email?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label>Membro desde</Input.Label>
          <Input.FormField placeholder="14/01/2026" disabled />
        </Input.Root>

        <Button
          className={s.button}
          variant="default"
          type="submit"
          disabled={isSubmitting}
        >
          Salvar alterações
        </Button>
      </form>

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
          textButton="Continuar"
          description="Conta atualizada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
