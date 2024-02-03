import { ResolvedMetadata } from 'next';
import { MemesPage } from '../../components/MemesPage';
import { generateMetadataBase } from '../../util/meta';

export default function Page() {
  return <MemesPage />;
}

export async function generateMetadata(_: unknown, parent: ResolvedMetadata) {
  return generateMetadataBase(
    {
      title: {
        absolute: 'Мемы о Надеждине',
      },
      description: 'Мемы о Борисе Надеждине, кандидате в президенты России в 2024 году',
      image: '/content/memes/00001.jpg',
      canonical: '/memes',
    },
    parent,
  );
}
