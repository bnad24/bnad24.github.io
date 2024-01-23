const TITLE = 'Борис Надеждин 2024: счетчики сбора подписей и статистика';
const DESCRIPTION = 'Отслеживание сбора подписей за кандидата в презеденты Бориса Надеждина, cстатистика по регионам';
const KEYWORDS = 'Надеждин,2024,выборы,подписи,статистика,счетчик';
const IMAGE_URL = 'https://raw.githubusercontent.com/bnad24/bnad24.github.io/main/public/social.png';

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
        <meta name="keywords" content={KEYWORDS} />
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
      <body>{children}</body>
    </html>
  );
}
