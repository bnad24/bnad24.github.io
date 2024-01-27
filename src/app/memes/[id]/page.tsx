import fs from 'fs-extra';
import type { MemesJson } from '../../../types';
import { MemePage } from '../../../components/MemePage';

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <MemePage id={id} />;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const { memes } = (await fs.readJSON('public/data/memes.json')) as MemesJson;
  return memes.map((meme) => ({ id: meme.id }));
}
