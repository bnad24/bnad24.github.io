import React from 'react';

export function OfficialLinks() {
  const maxWidth = '150px';

  return (
    <details>
      <summary>{'Ссылки на официальныe ресурсы Бориса Надеждина (нажмите чтобы развернуть)'}</summary>

      <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <table style={{ border: '#aaa solid 1px' }}>
          <tbody>
            <tr>
              <td style={{ maxWidth }}>{'Главная страница'}</td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/">
                  <b>{'nadezhdin2024.ru'}</b>
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                {'Адреса штабов где можно поставить подпись, а также официальная статистика'}
              </td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/addresses">
                  <b>{'nadezhdin2024.ru/addresses'}</b>
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Список регионов (города зарубежья внизу страницы)'}</td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/regions">
                  <b>{'nadezhdin2024.ru/regions'}</b>
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Поддержать'}</td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/#donate">
                  <b>{'nadezhdin2024.ru/#donate'}</b>
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Telegram'}</td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://t.me/BorisNadezhdin">
                  <b>{'t.me/BorisNadezhdin'}</b>
                </a>
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Telegram бот для поиска штабов'}</td>
              <td>
                <a target="_blank" rel="noreferrer" href="https://t.me/nadezhdin2024_bot">
                  <b>{'t.me/nadezhdin2024_bot'}</b>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  );
}
