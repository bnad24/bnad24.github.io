import { ResolvedMetadata } from 'next';
import { SigsPage } from '../../components/SigsPage';
import { generateMetadataBase } from '../../util/meta';

export default function Page() {
  return <SigsPage />;
}

export async function generateMetadata(_: unknown, parent: ResolvedMetadata) {
  return generateMetadataBase(
    {
      title: 'Подписи',
      image: '/social.png',
      canonical: '/sigs',
    },
    parent,
  );
}
