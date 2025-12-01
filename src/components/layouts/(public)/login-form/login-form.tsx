"use client";

import { Input } from "@/components/ui/input/input";
import {
  ILoginFormSchema,
  loginFormSchema,
} from "@/validations/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import s from "./_login-form.module.scss";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox/checkbox";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: ILoginFormSchema) => {
    console.log(data);
  };

  return (
    <form className={s.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="E-mail"
        placeholder="Email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        label="Senha"
        placeholder="Senha"
        {...register("password")}
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

      <Button className={s.button__send}>Entrar</Button>

      <p className={s.register}>
        Não tem conta ainda? <Link href="/cadastrar">Clique aqui!</Link>
      </p>
    </form>
  );
};
