'use client';

import classNames from 'classnames';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  return (
    <ul className="navigation-ul">
      <NavLink href="/">{'Статистика'}</NavLink>
      <NavLink href="/addresses">{'Адреса Штабов'}</NavLink>
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
