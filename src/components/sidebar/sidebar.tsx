'use client';

import { useAuth } from '@/hooks/use-auth';
import s from './_sidebar.module.scss';
import {
  ArrowLeftRightIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  TargetIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Transações',
    url: '/transacoes',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Metas',
    url: '/metas',
    icon: TargetIcon,
  },
  {
    title: 'Conta',
    url: '/conta',
    icon: UserIcon,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar__header}>
        <Image
          src="/logo/logo.svg"
          alt="logo"
          height={32}
          width={32}
          loading="lazy"
        />
        <strong className={s.logo}>MasterCash</strong>
        <small>v1.0</small>
      </div>

      <nav className={s.sidebar__items}>
        {items.map((item, index) => (
          <div key={index} className={s.nav__item_wrapper}>
            <Link
              href={item.url}
              className={`${s.nav__item} ${pathname.includes(item.url) ? s.active : ''}`}
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {<item.icon />}
              <span className={s.nav__text}>{item.title}</span>
            </Link>

            {hoveredItem === item.title && (
              <div className={s.tooltip}>{item.title}</div>
            )}
          </div>
        ))}
      </nav>

      <div className={s.sidebar__logout}>
        <button type="button" className={s.button__logout} onClick={logout}>
          <LogOutIcon size={20} />
          <span className={s.nav__text}>Sair</span>
        </button>
      </div>
    </aside>
  );
};
