import type { Metadata } from "next";
import s from "./page.module.scss";
import { LoginForm } from "@/components/layouts/(public)/login-form/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login para sua conta.",
};

export default function LoginPage() {
  return (
    <section className={s.login__wrapper}>
      <div className={s.login__container}>
        <h1>Bem vindo a plataforma</h1>

        <LoginForm />
      </div>

      <div>background</div>
    </section>
  );
}
