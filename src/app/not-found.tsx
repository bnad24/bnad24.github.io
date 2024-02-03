import Link from 'next/link';
import React from 'react';
import { generateMetadataBase } from '../util/meta';
import { ResolvedMetadata } from 'next';

export default function NotFound() {
  return (
    <div>
      <h1>{'Страница не найдена'}</h1>
      <Link href="/">{'На главную страницу'}</Link>
    </div>
  );
}

export async function generateMetadata(_: unknown, parent: ResolvedMetadata) {
  return generateMetadataBase(
    {
      title: 'Страница не найдена',
      image: '/social.png',
      canonical: '/404',
    },
    parent,
  );
}
