"use client";

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

export const AppSidebar = () => {
  const pathname = usePathname();

  const handleSignOut = async () => {};

  return (
    <aside>
      <h1>Sidebar</h1>
    </aside>
  );
};
