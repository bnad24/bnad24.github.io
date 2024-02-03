import { Navigation } from '../components/Navigation';
import { DESCRIPTION } from '../constants';
import Providers from '../providers';

import '../styles/global.scss';
import { generateMetadataBase } from '../util/meta';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐘</text></svg>"
        />
      </head>
      <body>
        <Providers>
          <aside className="navigation-wrapper">
            <Navigation />
          </aside>

          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  return generateMetadataBase({
    title: {
      template: '%s | Надеждин 2024',
      default: 'Неофициальный, но полезный сайт | Надеждин 2024',
    },
    description: DESCRIPTION,
    image: '/social.png',
    canonical: '/',
  });
}
