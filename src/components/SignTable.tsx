import { sortBy } from 'lodash-es';
import { useMemo } from 'react';
import { SignJson, SignRegion } from '../types';

function formatPercentage(value?: number): string {
  if (!value) {
    return '?';
  }

  let str = (100 * value).toFixed(1).toLocaleString();
  if (value > 1) {
    str = (100 * value).toFixed(0).toLocaleString();
  }
  if (value < 0.1) {
    str = (100 * value).toFixed(2).toLocaleString();
  }

  return `${str}%`;
}

export function SignTable({ data }: { data: SignJson }) {
  const rows = useMemo(() => {
    const regionsAndValues = sortBy(data.regionsAndValues, ({ value }) => -value);
    return regionsAndValues.map(({ region, value }) => {
      return <Region key={region} region={region} value={value} />;
    });
  }, [data.regionsAndValues]);

  const total = useMemo(() => formatPercentage(data.total / 100_000), [data.total]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <table>
          <tbody>
            <tr>
              <td>
                <b>{'Всего подписей (сумма регионов)'}</b>
              </td>
              <td className="text-right text-mono">
                <b>{data.total.toLocaleString()}</b>
              </td>
            </tr>

            <tr>
              <td>
                <b>{'Процент от необходимого'}</b>
              </td>
              <td className="text-right text-mono">
                <b>{total}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>{'Регион'}</th>
              <th>{'Подписей'}</th>
              <th>
                {'% необх.'}
                <br />
                {'(из 2500)'}
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

export function Region({ region, value }: SignRegion) {
  const percentage = useMemo(() => formatPercentage(value / 2_500), [value]);

  return (
    <tr>
      <td>{region}</td>
      <td className="text-right text-mono">{value?.toLocaleString() ?? '?'}</td>
      <td className="text-right text-mono">{percentage}</td>
    </tr>
  );
}
