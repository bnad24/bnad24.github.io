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
      return await (await fetch(url)).json();
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
  return (
    <div>
      <h1>{'Борис Надеждин: статистика сбора подписей'}</h1>
      <p>
        {
          'Этот сайт разработан и поддерживается волонтерами и никак не связан с Борисом Надеждиным или его соратниками!'
        }
      </p>
      <p>
        {
          'Статистика автоматически считывается с официального сайта и отображается в более компактной форме. "Всего" показывает сумму (результат сложения) по всем перечисленным регионам и может отличаться от цифры на официальном сайте.'
        }
      </p>
      <p>
        {'Официальный сайт Бориса Надеждина здесь: '}
        <a href="https://nadezhdin2024.ru/">
          <b>{'nadezhdin2024.ru'}</b>
        </a>
      </p>

      <SignTable />
    </div>
  );
}

export function SignTable() {
  const data = useJson<SignJson>('/data/sign.json');
  const rows = useMemo(() => {
    const regionsAndValues = sortBy(data.regionsAndValues, ({ value }) => -value);
    return regionsAndValues.map(({ region, value }) => {
      return <Region key={region} region={region} value={value} />;
    });
  }, [data.regionsAndValues]);

  const updatedAt = useMemo(
    () => DateTime.fromISO(data.updatedAt).setLocale('ru').toLocaleString(DateTime.DATETIME_FULL),
    [data.updatedAt],
  );

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <b>{'Обновлено'}</b>
          </td>
          <td>
            <b>{updatedAt}</b>
          </td>
        </tr>

        <tr>
          <td>
            <b>{'Всего (сумма регионов)'}</b>
          </td>
          <td>
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
      <td>{value?.toLocaleString() ?? 'нет данных'}</td>
    </tr>
  );
}
