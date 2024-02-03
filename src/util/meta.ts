import type { Metadata, ResolvedMetadata } from 'next';
import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { BASE_URL } from '../constants';
import { AlternateLinkDescriptor } from 'next/dist/lib/metadata/types/alternative-urls-types';

export async function generateMetadataBase(
  meta: {
    title?: string | TemplateString;
    description?: string;
    image?: string;
    canonical?: string | URL | AlternateLinkDescriptor;
    keywords?: string | string[] | null | undefined;
  },
  parentPromise?: ResolvedMetadata,
): Promise<Metadata> {
  const parent = await parentPromise;

  const title = meta.title ?? parent?.title ?? '';
  const description = meta.description ?? parent?.description ?? '';
  const canonical = meta.canonical ?? parent?.alternates?.canonical;
  const image = meta.image ?? parent?.openGraph?.images;

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
    keywords: meta.keywords,
  };
}
