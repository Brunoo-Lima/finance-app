import { ShieldIcon, UserIcon } from 'lucide-react';
import s from './_account.module.scss';
import { AccountForm } from './account-form/account-form';
import { PasswordForm } from './password-form/password-form';
import { ClearData } from './clear-data/clear-data';

export const Account = () => {
  return (
    <div className={s.account__wrapper}>
      <div className={s.card__container}>
        <div className={s.card__header}>
          <UserIcon size={24} />
          <strong>Informações do perfil</strong>
        </div>

        <AccountForm />
      </div>

      <div className={s.card__container}>
        <div className={s.card__header}>
          <ShieldIcon size={24} />
          <strong>Segurança</strong>
        </div>

        <PasswordForm />
      </div>

      <div className={s.card__container}>
        <ClearData />
      </div>
    </div>
  );
};
