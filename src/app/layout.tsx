import { Navigation } from '../components/Navigation';
import { DESCRIPTION, IMAGE_URL, TITLE } from '../constants';
import Providers from '../providers';

import '../styles/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>{TITLE}</title>
        <meta name="title" content={TITLE} />
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, nofollow" />
        <meta name="revisit-after" content="1 days" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE_URL} />
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
