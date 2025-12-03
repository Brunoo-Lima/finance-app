"use client";

import { useRouter } from "next/navigation";
import s from "./_header.module.scss";
import { LogOutIcon } from "lucide-react";

export const Header = () => {
  const router = useRouter();

  return (
    <header className={s.header__wrapper}>
      <strong>Finance app</strong>

      <button className={s.btn__logout} type="button">
        <LogOutIcon size={20} color="#ffffff" />
        Sair da conta
      </button>
    </header>
  );
};
