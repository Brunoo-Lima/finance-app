import type { Metadata } from 'next';
import s from './page.module.scss';
import { RegisterForm } from '@/components/layouts/(public)/register-form/register-form';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Criar conta',
  description: 'Criar conta',
};

export default function RegisterPage() {
  return (
    <section className={s.register__wrapper}>
      <div className={s.register__container}>
        <div className={s.register__header}>
          <Link href={'/'}>
            <ChevronLeftIcon size={24} color="currentColor" />
          </Link>
          <h1>Vamos criar sua conta</h1>
        </div>

        <RegisterForm />

        <div className={s.logo__name}>
          <Image src="/logo/logo.svg" alt="logo" height={24} width={24} />
          <span>MasterCash</span>
        </div>
      </div>
    </section>
  );
}
