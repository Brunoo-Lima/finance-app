import type { Metadata } from 'next';
import s from './page.module.scss';
import { RegisterForm } from '@/components/layouts/(public)/register-form/register-form';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

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
      </div>
    </section>
  );
}
