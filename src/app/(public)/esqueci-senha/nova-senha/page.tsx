import type { Metadata } from 'next';
import s from './page.module.scss';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { NewPasswordForm } from '@/components/layouts/(public)/new-password-form/new-password-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nova senha',
  description: 'Nova senha.',
};

export default function NewPasswordPage() {
  return (
    <section className={s.new__password__wrapper}>
      <div className={s.new__password__container}>
        <div className={s.new__password__header}>
          <Link href={'/'}>
            <ChevronLeftIcon size={24} color="currentColor" />
          </Link>
          <h1>Nova senha</h1>
        </div>

        <p>Insira a nova senha.</p>

        <NewPasswordForm />

        <div className={s.logo__name}>
          <Image src="/logo/logo.svg" alt="logo" height={24} width={24} />
          <span>MasterCash</span>
        </div>
      </div>
    </section>
  );
}
