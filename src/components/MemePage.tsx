'use client';

import { useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Meme, MemesJson } from '../types';
import { useJson } from '../util/useJson';
import { Sharing } from './Sharing';
import Link from 'next/link';
import { UpdatedAt } from './UpdatedAt';

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

  const name = useMemo(() => {
    if (memeData?.meme?.name) {
      return <h2>{memeData?.meme?.name}</h2>;
    }
    return null;
  }, [memeData?.meme?.name]);

  const description = useMemo(() => {
    if (memeData?.meme?.description) {
      return <p>{addPeriod(memeData?.meme?.description)}</p>;
    }
    return null;
  }, [memeData?.meme?.description]);

  if (!memeData || !data) {
    return null;
  }
  const { meme, prevUrl, nextUrl } = memeData;

  return (
    <article>
      <header>
        <h1>{'Борис Надеждин 2024: Мемы'}</h1>
        {name}
        {description}
      </header>

      <nav style={{ display: 'flex', marginBottom: '0.25rem' }}>
        <div style={{ margin: 'auto' }}>
          <Link href="/memes">{'К списку'}</Link>
        </div>
      </nav>

      <nav style={{ display: 'flex', marginBottom: '1rem' }}>
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
      </nav>

      <main>
        <figure style={{ flex: '1' }} className="meme-img-wrapper">
          <picture>
            <img className="meme-img" src={meme.url} alt={memeCaption(meme)} />
          </picture>
          <figcaption>{memeCaption(meme)}</figcaption>
        </figure>
      </main>

      <aside style={{ marginBottom: '1rem', display: 'flex' }}>
        <Sharing />
      </aside>

      <footer>
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

        <div style={{ marginBottom: '1rem' }}>
          <UpdatedAt data={data} />
        </div>
      </footer>
    </article>
  );
}

function memeCaption(meme: Meme) {
  if (!meme.name) {
    return undefined;
  }
  const name = addPeriod(meme.name);
  if (!meme.description) {
    return name;
  }

  const description = addPeriod(meme.description);
  return [name, description].join(' ');
}

function addPeriod(s: string) {
  if (!['.', '!', '?'].some((c) => s.endsWith(c))) {
    return `${s}.`;
  }
  return s;
}
