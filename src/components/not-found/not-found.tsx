'use client';

import Image from 'next/image';
import { Button } from '../ui/button/button';
import s from './_not-found.module.scss';
import { useRouter } from 'next/navigation';

export const NotFound = () => {
  const router = useRouter();

  return (
    <section className={s.not__found__wrapper}>
      <Image src="/images/error-404.svg" alt="404" height={400} width={400} />

      <h1>Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>

      <Button
        className={s.button}
        variant="default"
        onClick={() => router.back()}
      >
        Voltar
      </Button>
    </section>
  );
};
