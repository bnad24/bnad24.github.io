import { clamp, sortBy, sum, isFinite } from 'lodash-es';
import { useMemo } from 'react';
import { SignJson, SignRegion } from '../types';
import { FaTelegram } from 'react-icons/fa';

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
    return regionsAndValues.map(({ region, value, tg }) => {
      return <Region key={region} region={region} value={value} tg={tg} />;
    });
  }, [data.regionsAndValues]);

  const totalPerc = useMemo(() => formatPercentage(data.total / 100_000), [data.total]);

  const totalCapped = useMemo(() => {
    const clamped = data.regionsAndValues
      .map(({ value }) => value)
      .filter(isFinite)
      .map((value) => clamp(value, 0, 2500));
    return sum(clamped);
  }, [data]);

  const remainsCapped = 100000 - totalCapped;

  const totalCappedPerc = useMemo(() => formatPercentage(totalCapped / 100_000), [totalCapped]);

  const nRegions = useMemo(
    () => data.regionsAndValues.filter(({ value }) => value && value > 0).length,
    [data.regionsAndValues],
  );

  const nRegionsDone = useMemo(
    () => data.regionsAndValues.filter(({ value }) => value && value > 2500).length,
    [data.regionsAndValues],
  );

  const nRegionsRemain = nRegions - nRegionsDone;

  const maxWidth = '250px';

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <table>
          <tbody>
            <tr>
              <td style={{ maxWidth }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{'Всего собрано'}</span>
                <br />
                <span>{'(исключая излишки свыше 2500 в каждом регионе)'}</span>
              </td>
              <td
                style={{ color: '#005b00', fontSize: '1.25rem', fontWeight: 'bold' }}
                className="text-right text-mono"
              >
                {totalCapped.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{'Всего осталось'}</span>
                <br />
                <span>{'(исключая излишки свыше 2500 в каждом регионе)'}</span>
              </td>
              <td
                style={{ color: '#922204', fontSize: '1.25rem', fontWeight: 'bold' }}
                className="text-right text-mono"
              >
                {remainsCapped.toLocaleString()}
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Всего необходимо'}</td>
              <td className="text-right text-mono">{Number(100000).toLocaleString()}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Процент от необходимого'}</td>
              <td className="text-right text-mono">{totalCappedPerc}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                {'Всего подписей'}
                <br />
                {'(включая излишки)'}
              </td>
              <td className="text-right text-mono">{data.total.toLocaleString()}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                {'Процент от необходимого'}
                <br />
                {'(включая излишки)'}
              </td>
              <td className="text-right text-mono">{totalPerc}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Необходимо регионов'}</td>
              <td className="text-right text-mono">{'более 40'}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Необходимо в каждом регионе'}</td>
              <td className="text-right text-mono">{2500}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Всего регионов участвуют'}</td>
              <td className="text-right text-mono">{nRegions}</td>
            </tr>

            <tr>
              <td>{'Всего регионов справились'}</td>
              <td className="text-right text-mono">{nRegionsDone}</td>
            </tr>
            <tr>
              <td>{'Всего регионов не справились'}</td>
              <td className="text-right text-mono">{nRegionsRemain}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <table className="striped">
          <thead>
            <tr>
              <th>{''}</th>
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

export function Region({ region, value, tg }: SignRegion) {
  const percentage = useMemo(() => {
    if (!value) {
      return '?';
    }
    const percentage = value / 2_500;
    let color = '#222';
    if (percentage < 1) {
      color = '#922204';
    }
    if (percentage >= 1) {
      color = '#005b00';
    }
    return <span style={{ color: color }}>{formatPercentage(percentage)}</span>;
  }, [value]);

  const valueFormatted = useMemo(() => {
    if (!value) {
      return '?';
    }
    let color = '#222';
    if (value < 2500) {
      color = '#922204';
    }
    if (value >= 2500) {
      color = '#005b00';
    }
    const valueFormatted = value.toLocaleString();
    return <span style={{ color: color }}>{valueFormatted}</span>;
  }, [value]);

  const maxWidth = '160px';

  return (
    <tr>
      <td>
        {tg && (
          <a target="_blank" rel="noreferrer" href={tg}>
            <FaTelegram color="#229ED9" />
          </a>
        )}
      </td>
      <td className="ellipsis" title={region} style={{ maxWidth }}>
        {region}
      </td>
      <td className="text-right text-mono">{valueFormatted}</td>
      <td className="text-right text-mono">{percentage}</td>
    </tr>
  );
}
