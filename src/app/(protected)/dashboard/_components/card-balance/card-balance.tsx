import { ArrowUpDownIcon, EyeIcon, WalletIcon } from "lucide-react";
import s from "./_card-balance.module.scss";

export const CardBalance = () => {
  return (
    <div className={s.card__balance__container}>
      <div className={s.balance__wrapper}>
        <div className={s.label}>
          <div className={s.icon__container}>
            <WalletIcon size={20} />
          </div>
          <p>Saldo</p>
        </div>

        <div className={s.value__container}>
          <h2>R$ 2.700</h2>
          <EyeIcon />
        </div>
      </div>

      <button type="button" className={s.btn__add__transaction}>
        Adicionar Transação <ArrowUpDownIcon size={18} />
      </button>
    </div>
  );
};
