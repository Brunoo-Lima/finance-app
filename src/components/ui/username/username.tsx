'use client';

import { useAuth } from '@/hooks/use-auth';
import s from './_username.module.scss';

export const Username = () => {
  const { user } = useAuth();

  return (
    <p className={s.username}>
      Olá, <span>{user && user.name}</span>
    </p>
  );
};
