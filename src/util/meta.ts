import type { Metadata, ResolvedMetadata } from 'next';
import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { BASE_URL } from '../constants';

export async function generateMetadataBase(
  meta: Metadata & {
    title?: string | TemplateString;
    description?: string;
    image?: string;
    canonical?: string;
    keywords?: string[];
  },
  parentPromise?: ResolvedMetadata,
): Promise<Metadata> {
  const parent = await parentPromise;

  // eslint-disable-next-line prefer-const
  let { title, description, image, canonical, keywords, ...rest } = meta;
  title = meta.title ?? parent?.title ?? '';
  description = meta.description ?? parent?.description ?? '';
  canonical = meta.canonical ?? (parent?.alternates?.canonical as unknown as string) ?? '/';
  image = meta.image ?? (parent?.openGraph?.images as unknown as string);
  keywords = meta.keywords ?? parent?.keywords ?? [];

  return {
    title: title ?? parent?.title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: image ?? [],
    },
    openGraph: {
      title,
      description,
      images: image ?? [],
    },
    keywords,
    ...rest,
  };
}
