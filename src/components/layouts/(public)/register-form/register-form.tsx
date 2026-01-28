'use client';

import { useForm } from 'react-hook-form';
import s from './_register-form.module.scss';
import {
  IRegisterFormSchema,
  registerFormSchema,
} from '@/validations/register-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { useModalState } from '@/hooks/use-modal-state';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { useRouter } from 'next/navigation';
import { InputPassword } from '@/components/ui/input/input-password/input-password';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

export const RegisterForm = () => {
  const router = useRouter();
  const { register: registerService } = useAuth();
  const { showSuccess, setShowSuccess, showConfirm, setShowConfirm } =
    useModalState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: IRegisterFormSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await registerService(data.name, data.email, data.password);

      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao criar conta.');
    }
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          placeholder="Digite o nome"
          {...register('name')}
          error={errors.name}
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="Digite o email"
          {...register('email')}
          error={errors.email}
        />

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
          description="Conta criada com sucesso!"
          onConfirm={() => {
            setShowSuccess(false);
            router.push('/');
          }}
        />
      )}
    </>
  );
};
