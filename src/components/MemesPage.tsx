'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Meme, MemesJson } from '../types';
import { useJson } from '../util/useJson';
import { Sharing } from './Sharing';
import { UpdatedAt } from './UpdatedAt';

export function MemesPage() {
  const data = useJson<MemesJson>('/data/memes.json');

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{'Борис Надеждин 2024: Мемы'}</h1>

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
        <UpdatedAt data={data} />
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex' }}>
        <span style={{ margin: '0 auto' }}>
          <Sharing />
        </span>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex' }}>
        <div style={{ margin: '0 auto' }} className="meme-preview-wrapper">
          {data.memes.map((meme) => {
            return <MemeImage key={meme.id} meme={meme} />;
          }, [])}
        </div>
      </div>
    </div>
  );
}

export function MemeImage({ meme }: { meme: Meme }) {
  const href = useMemo(() => `/memes/${meme.id}`, [meme.id]);
  return (
    <Link className="meme-preview-link" href={href}>
      <img className="meme-preview-img" src={meme.url} loading="lazy" />
    </Link>
  );
}
