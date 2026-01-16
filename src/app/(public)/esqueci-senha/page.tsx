import type { Metadata } from 'next';
import s from './page.module.scss';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { ForgotPasswordForm } from '@/components/layouts/(public)/forgot-password-form/forgot-password-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Esqueci minha senha',
  description: 'Esqueci minha senha.',
};

export default function ForgotPasswordPage() {
  return (
    <section className={s.forgot__password__wrapper}>
      <div className={s.forgot__password__container}>
        <div className={s.forgot__password__header}>
          <Link href={'/'}>
            <ChevronLeftIcon size={24} color="currentColor" />
          </Link>
          <h1>Esqueci minha senha</h1>
        </div>

        <p>
          Insira o seu e-mail para enviarmos as instruções para redefinir sua
          senha.
        </p>

        <ForgotPasswordForm />

        <div className={s.logo__name}>
          <Image src="/logo/logo.svg" alt="logo" height={24} width={24} />
          <span>MasterCash</span>
        </div>
      </div>
    </section>
  );
}
