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
  const meme = memes.find((meme) => meme.id == id);
  if (!meme) {
    throw new Error(`Meme not found: id='${id}'`);
  }

  const { name, url, id: memeId, description } = meme;

  return generateMetadataBase(
    {
      title: {
        absolute: `${name ?? memeId} | Мемы о Надеждине`,
      },
      description: `${description ?? name ?? memeId} | Мемы о Борисе Надеждине 2024`,
      image: url,
      canonical: `/memes/${memeId}`,
    },
    parent,
  );
}
