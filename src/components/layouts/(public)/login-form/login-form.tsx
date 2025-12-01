"use client";

import { Input } from "@/components/ui/input/input";
import {
  ILoginFormSchema,
  loginFormSchema,
} from "@/validations/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import s from "./_login-form.module.scss";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginFormSchema) => {
    console.log(data);
  };

  return (
    <form className={s.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input label="E-mail" placeholder="Email" />
      <Input label="Senha" placeholder="Senha" />
    </form>
  );
};
