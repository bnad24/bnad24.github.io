import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div>
      <h1>{'Страница не найдена'}</h1>
      <Link href="/">{'На главную страницу'}</Link>
    </div>
  );
}
