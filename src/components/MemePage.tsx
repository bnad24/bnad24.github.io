'use client';

import { useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MemesJson } from '../types';
import { useJson } from '../util/useJson';
import { Sharing } from './Sharing';
import Link from 'next/link';

export interface Address {
  region: string;
  texts: string[];
  tgs: string[];
  phones: string[];
  html?: string;
}

export interface AddressesJson {
  addresses: Address[];
  updatedAt: string;
}

export function MemePage({ id }: { id: string }) {
  const data = useJson<MemesJson>('/data/memes.json');

  const memeData = useMemo(() => {
    if (!data) {
      return null;
    }

    const i = data.memes.findIndex((meme) => meme.id === id);
    if (i === -1) {
      return undefined;
    }

    let prevUrl = undefined;
    const prev = i > 0 ? data.memes[i - 1] : undefined;
    if (prev) {
      prevUrl = `/memes/${prev.id}`;
    }

    let nextUrl = undefined;
    const next = i < data.memes.length - 1 ? data.memes[i + 1] : undefined;
    if (next) {
      nextUrl = `/memes/${next.id}`;
    }

    return { meme: data.memes[i], prevUrl, nextUrl };
  }, [data, id]);

  if (!memeData) {
    return null;
  }

  const { meme, prevUrl, nextUrl } = memeData;

  return (
    <div>
      <h2>{'Мемы'}</h2>

      <p>
        {'Мемы о Борисе Надеждине, кандидате в президенты России в 2024 году. Добавляйте ещё на GitHub: '}
        <a target="_blank" rel="noreferrer" href="https://github.com/bnad24/bnad24.github.io/issues/new/choose">
          {'кидайте в Issues'}
        </a>
        {' или, если умеете, через Pull Request в папку '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/bnad24/bnad24.github.io/tree/main/public/content/memes"
        >
          {'memes'}
        </a>
        {'.'}
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <Sharing />
      </div>

      <p>{'Мемы о Борисе Надеждине, кандидате в президенты России в 2024 году.'}</p>

      <span style={{ display: 'flex', marginBottom: '1rem' }}>
        <div style={{ marginRight: 'auto' }}>
          {!!prevUrl && (
            <Link style={{ padding: '2rem' }} href={prevUrl}>
              <FaArrowLeft size={20} />
            </Link>
          )}
        </div>

        <div style={{ margin: 'auto' }}>
          <a target="_blank" rel="noreferrer" href={meme.url}>
            {'Прямая ссылка на картинку'}
          </a>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          {!!nextUrl && (
            <Link style={{ padding: '2rem' }} href={nextUrl}>
              <FaArrowRight size={20} />
            </Link>
          )}
        </div>
      </span>

      <div style={{ flex: '1' }} className="meme-img-wrapper">
        <img className="meme-img" src={meme.url} />
      </div>
    </div>
  );
}
