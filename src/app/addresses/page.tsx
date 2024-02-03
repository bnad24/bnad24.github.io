import { ResolvedMetadata } from 'next';
import { AddressesPage } from '../../components/AddressesPage';
import { generateMetadataBase } from '../../util/meta';

export default function Page() {
  return <AddressesPage />;
}

export async function generateMetadata(_: unknown, parent: ResolvedMetadata) {
  return generateMetadataBase(
    {
      title: 'Штабы',
      canonical: '/addresses',
    },
    parent,
  );
}
