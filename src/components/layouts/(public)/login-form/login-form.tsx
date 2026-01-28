'use client';

import { Input } from '@/components/ui/input/input';
import {
  ILoginFormSchema,
  loginFormSchema,
} from '@/validations/login-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import s from './_login-form.module.scss';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import { useAuth } from '@/hooks/use-auth';
import { InputPassword } from '@/components/ui/input/input-password/input-password';
import Loading from '@/components/ui/loading/loading';
import { toast } from 'sonner';

export const LoginForm = () => {
  const { loginService } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: ILoginFormSchema) => {
    try {
      await loginService(data.email, data.password, data.remember || false);
    } catch (error) {
      console.log(error);
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <form className={s.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="E-mail"
        placeholder="Email"
        {...register('email')}
        error={errors.email}
      />
      <InputPassword
        label="Senha"
        placeholder="Senha"
        maxLength={6}
        {...register('password')}
        error={errors.password}
      />

      <div className={s.actions}>
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <Checkbox label="Lembrar-me" id="remember" {...field} />
          )}
        />

        <Link className={s.forgot__password} href="/esqueci-senha">
          Esqueci a senha
        </Link>
      </div>

      <Button type="submit" disabled={isSubmitting} className={s.button__send}>
        {isSubmitting ? <Loading size={20} /> : 'Entrar'}
      </Button>

      <p className={s.register}>
        Não tem conta ainda? <Link href="/cadastrar">Clique aqui!</Link>
      </p>
    </form>
  );
};
