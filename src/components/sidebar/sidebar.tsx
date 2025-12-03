"use client";

import s from "./_sidebar.module.scss";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  LayoutDashboardIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transações",
    url: "/transacoes",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Conta",
    url: "/conta",
    icon: CircleUserRoundIcon,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const handleSignOut = async () => {};

  return (
    <aside className={s.sidebar}>
      <nav className={s.sidebar__items}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={`${s.nav__item} ${pathname.includes(item.url) ? s.active : ""}`}
          >
            {<item.icon />}
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
