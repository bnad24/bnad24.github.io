'use client';

import classNames from 'classnames';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  return (
    <ul className="navigation-ul">
      <Link href="/" style={{ marginRight: '1rem' }}>
        <img height="16px" src="/logo.png" alt="Логотип сайта" />
      </Link>
      <NavLink href="/">{'Главная'}</NavLink>
      <NavLink href="/sigs">{'Подписи'}</NavLink>
      <NavLink href="/addresses">{'Штабы'}</NavLink>
      <NavLink href="/memes">{'Мемы'}</NavLink>
    </ul>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <li className={classNames(pathname == href ? 'active' : '')}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
