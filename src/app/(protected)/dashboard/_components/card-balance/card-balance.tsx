"use client";

import { EyeIcon, EyeOffIcon, PlusIcon, WalletIcon } from "lucide-react";
import s from "./_card-balance.module.scss";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";

export const CardBalance = () => {
  const [isVisibleBalance, setIsVisibleBalance] = useState<boolean>(false);

  return (
    <div className={s.card__balance__container}>
      <div className={s.balance__wrapper}>
        <div className={s.card__header}>
          <div className={s.label}>
            <div className={s.icon__container}>
              <WalletIcon size={20} />
            </div>
            <p>Saldo</p>
          </div>

          <button type="button" className={s.button__add}>
            <PlusIcon size={16} />
          </button>
        </div>

        <div className={s.value__container}>
          <h2>
            {isVisibleBalance
              ? [1, 2, 3, 4, 5].map((index) => <span key={index}></span>)
              : "R$ 2.700"}
          </h2>
          {isVisibleBalance ? (
            <EyeIcon
              size={24}
              className={s.icon}
              onClick={() => setIsVisibleBalance(false)}
            />
          ) : (
            <EyeOffIcon
              size={24}
              className={s.icon}
              onClick={() => setIsVisibleBalance(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
