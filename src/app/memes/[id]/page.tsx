import fs from 'fs-extra';
import type { Metadata, ResolvedMetadata } from 'next';
import type { MemesJson } from '../../../types';
import { MemePage } from '../../../components/MemePage';
import { generateMetadataBase } from '../../../util/meta';

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <MemePage id={id} />;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const { memes } = (await fs.readJSON('public/data/memes.json')) as MemesJson;
  return memes.map((meme) => ({ id: meme.id }));
}

export async function generateMetadata(
  { params: { id } }: { params: { id: string } },
  parent: ResolvedMetadata,
): Promise<Metadata> {
  if (!id) {
    throw new Error('ID is required');
  }

  const { memes } = (await fs.readJSON('public/data/memes.json')) as MemesJson;
  const i = memes.findIndex((meme) => meme.id === id);
  if (i === -1) {
    throw new Error(`Meme not found: id='${id}'`);
  }

  const meme = memes[i];
  const { name, url, id: memeId, description } = meme;

  const prevAndNext = [];

  const prev = i > 0 ? memes[i - 1] : undefined;
  if (prev) {
    const prevUrl = `/memes/${prev.id}`;
    prevAndNext.push({ rel: 'prev', url: prevUrl });
  }

  const next = i < memes.length - 1 ? memes[i + 1] : undefined;
  if (next) {
    const nextUrl = `/memes/${next.id}`;
    prevAndNext.push({ rel: 'next', url: nextUrl });
  }

  return generateMetadataBase(
    {
      title: {
        absolute: `${name ?? memeId} | Мемы о Надеждине`,
      },
      description: `${description ?? name ?? memeId} | Мемы о Борисе Надеждине 2024`,
      image: url,
      canonical: `/memes/${memeId}`,
      icons: {
        other: [...prevAndNext],
      },
    },
    parent,
  );
}
