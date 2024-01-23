'use client';

import type { SignJson } from '../types';
import { useJson } from '../util/useJson';
import { SignTable } from './SignTable';
import { UpdatedAt } from './UpdatedAt';

export function Main() {
  const data = useJson<SignJson>('/data/sign.json');

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{'Борис Надеждин'}</h1>
      <h2>{'Статистика сбора подписей'}</h2>

      <details>
        <summary>{'Что это такое? (нажмите чтобы развернуть)'}</summary>
        <p>
          {
            'Этот сайт разработан и поддерживается народными умельцами, и никак не связан с Борисом Надеждиным или его соратниками!'
          }
        </p>
        <p>
          {
            'Статистика автоматически считывается с официального сайта Бориса Надеждина каждые 15 минут и отображается в более компактной и удобной форме. "Всего" показывает сумму (результат сложения) по всем перечисленным регионам и может отличаться от цифры на официальном сайте. Исходный код '
          }
          <a target="_blank" rel="noreferrer" href="https://github.com/bnad24/bnad24.github.io">
            {'здесь'}
          </a>
          {'.'}
        </p>
      </details>

      <details>
        <summary>{'Ссылки на официальныe ресурсы Бориса Надеждина (нажмите чтобы развернуть)'}</summary>

        <div style={{ marginBottom: '1rem' }}>
          <table style={{ border: '#aaa solid 1px' }}>
            <tbody>
              <tr>
                <td>{'Главная страница'}</td>
                <td>
                  <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/">
                    <b>{'nadezhdin2024.ru'}</b>
                  </a>
                </td>
              </tr>

              <tr>
                <td>{'Адреса штабов где можно поставить подпись, а также официальная статистика'}</td>
                <td>
                  <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/addresses">
                    <b>{'nadezhdin2024.ru/addresses'}</b>
                  </a>
                </td>
              </tr>

              <tr>
                <td>{'Список регионов (города зарубежья внизу страницы)'}</td>
                <td>
                  <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/regions">
                    <b>{'nadezhdin2024.ru/regions'}</b>
                  </a>
                </td>
              </tr>

              <tr>
                <td>{'Поддержать'}</td>
                <td>
                  <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/#donate">
                    <b>{'nadezhdin2024.ru/#donate'}</b>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <div style={{ marginBottom: '1rem' }}>
        <UpdatedAt data={data} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <SignTable data={data} />
      </div>
    </div>
  );
}
