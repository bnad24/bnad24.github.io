import { Navigation } from '../components/Navigation';
import { DESCRIPTION } from '../constants';
import Providers from '../providers';

import '../styles/global.scss';
import { generateMetadataBase } from '../util/meta';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#4b8ad8" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="msapplication-TileColor" content="#c6d3e3" />
        <meta name="msapplication-TileImage" content="favicons/mstile-144x144.png" />
        <meta name="msapplication-config" content="favicons/browserconfig.xml" />
        <meta name="theme-color" content="#c6d3e3" />
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
