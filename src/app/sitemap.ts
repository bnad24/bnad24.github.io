import fs from 'fs-extra';
import { MetadataRoute } from 'next';
import { BASE_URL } from '../constants';
import { MemesJson } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { memes } = (await fs.readJSON('public/data/memes.json')) as MemesJson;
  const memeEntries = memes.map((meme) =>
    createSitemapEntry({
      url: `/memes/${meme.id}`,
      priority: 0.95,
    }),
  );

  return [
    createSitemapEntry({ url: '/', priority: 1 }),
    createSitemapEntry({ url: '/sigs', priority: 0.5 }),
    createSitemapEntry({ url: '/addresses', priority: 0.5 }),
    createSitemapEntry({ url: '/memes', priority: 0.9 }),
    ...memeEntries,
  ];
}

type SitemapEntry = MetadataRoute.Sitemap[0];
type ChangeFrequency = SitemapEntry['changeFrequency'];

function createSitemapEntry({
  url,
  changeFrequency,
  priority,
}: {
  url: string;
  changeFrequency?: ChangeFrequency;
  priority?: number;
}): SitemapEntry {
  return {
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency ?? 'daily',
    priority: priority ?? 1,
  };
}
