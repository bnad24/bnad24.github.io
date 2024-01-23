'use client';

import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { sortBy } from 'lodash-es';

function useJson<T>(url: string) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryKey = useMemo(() => [url], [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      return await (await fetch(`${window.location.href}/${url}`)).json();
    },
  });

  if (error) {
    throw error;
  }
  return data as T;
}

export interface SignRegion {
  region: string;
  value?: number;
}

export interface SignJson {
  regionsAndValues: SignRegion[];
  total: number;
  updatedAt: string;
}

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
            'Статистика автоматически считывается с официального сайта Бориса Надеждина и отображается в более компактной и удобной форме. "Всего" показывает сумму (результат сложения) по всем перечисленным регионам и может отличаться от цифры на официальном сайте. Исходный код '
          }
          <a target="_blank" rel="noreferrer" href="https://github.com/bnad24/bnad24.github.io">
            {'здесь'}
          </a>
          {'.'}
        </p>
      </details>

      <details>
        <summary>{'Ссылки на официальныe ресурсы Бориса Надеждина'}</summary>

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

export function UpdatedAt({ data }: { data: SignJson }) {
  const updatedAt = useMemo(
    () => DateTime.fromISO(data.updatedAt).setLocale('ru').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
    [data.updatedAt],
  );

  return (
    <p>
      <b>
        {'Обновлено: '}
        {updatedAt}
      </b>
    </p>
  );
}

export function SignTable({ data }: { data: SignJson }) {
  const rows = useMemo(() => {
    const regionsAndValues = sortBy(data.regionsAndValues, ({ value }) => -value);
    return regionsAndValues.map(({ region, value }) => {
      return <Region key={region} region={region} value={value} />;
    });
  }, [data.regionsAndValues]);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <b>{'Всего (сумма регионов)'}</b>
          </td>
          <td className="text-right">
            <b>{data.total.toLocaleString()}</b>
          </td>
        </tr>

        {rows}
      </tbody>
    </table>
  );
}

export function Region({ region, value }: SignRegion) {
  return (
    <tr>
      <td>{region}</td>
      <td className="text-right">{value?.toLocaleString() ?? 'нет данных'}</td>
    </tr>
  );
}
