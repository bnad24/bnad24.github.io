import { clamp, sortBy, sum, isFinite } from 'lodash-es';
import { useMemo } from 'react';
import { SignJson, SignRegion } from '../types';
import { FaTelegram } from 'react-icons/fa';
import { N_PER_REGION_MAX, N_PER_REGION_DESIRED, TOTAL_REQUIRED, TOTAL_DESIRED } from '../constants';

function formatPercentage(value?: number): string {
  if (!value) {
    return '?';
  }
  const str = (100 * value).toFixed(1);
  return `${str}%`;
}

export function SignTable({ data }: { data: SignJson }) {
  const rows = useMemo(() => {
    const regionsAndValues = sortBy(data.regionsAndValues, ({ value }) => -value);
    return regionsAndValues.map(({ region, value, tg }) => {
      return <Region key={region} region={region} value={value} tg={tg} />;
    });
  }, [data.regionsAndValues]);

  const totalRequired = useMemo(() => {
    const clamped = data.regionsAndValues
      .map(({ value }) => value)
      .filter(isFinite)
      .map((value) => clamp(value, 0, N_PER_REGION_MAX));
    return sum(clamped);
  }, [data]);

  const totalDesired = useMemo(() => {
    const clamped = data.regionsAndValues
      .map(({ value }) => value)
      .filter(isFinite)
      .map((value) => clamp(value, 0, N_PER_REGION_DESIRED));
    return sum(clamped);
  }, [data]);

  const remainsRequired = TOTAL_REQUIRED - totalRequired;
  const remainsDesired = TOTAL_DESIRED - totalDesired;

  const totalRequiredPerc = useMemo(() => formatPercentage(totalRequired / TOTAL_REQUIRED), [totalRequired]);
  const totalDesiredPerc = useMemo(() => formatPercentage(totalDesired / TOTAL_DESIRED), [totalDesired]);

  const nRegions = useMemo(
    () => data.regionsAndValues.filter(({ value }) => value && value > 0).length,
    [data.regionsAndValues],
  );

  const nRegionsDesiredDone = useMemo(
    () => data.regionsAndValues.filter(({ value }) => value && value > N_PER_REGION_DESIRED).length,
    [data.regionsAndValues],
  );

  const nRegionsDesiredRemain = nRegions - nRegionsDesiredDone;

  const nRegionsRequiredDone = useMemo(
    () => data.regionsAndValues.filter(({ value }) => value && value > N_PER_REGION_MAX).length,
    [data.regionsAndValues],
  );

  const nRegionsRequiredRemain = nRegions - nRegionsRequiredDone;

  const maxWidth = '250px';

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>{''}</th>
              <th>
                {'Цель'}
                <br /> {'желаемая'}
              </th>
              <th>
                {'Цель'}
                <br /> {'минимум'}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ maxWidth }}>{'Всего нужно собрать'}</td>
              <td className="text-right text-mono">{Number(TOTAL_DESIRED)}</td>
              <td className="text-right text-mono">{Number(TOTAL_REQUIRED)}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Нужно макс. в каждом регионе'}</td>
              <td className="text-right text-mono">{N_PER_REGION_DESIRED}</td>
              <td className="text-right text-mono">{N_PER_REGION_MAX}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                <span>{'Всего собрано'}</span>
                <br />
                <span>{`(включая излишки)`}</span>
              </td>
              <td colSpan={2} style={{ textAlign: 'center' }} className="text-mono">
                {data.total}
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{'Всего собрано'}</span>
                <br />
                <span>{`(исключая излишки)`}</span>
              </td>
              <td
                style={{ color: '#005b00', fontSize: '1.25rem', fontWeight: 'bold', padding: '0 1rem' }}
                className="text-right text-mono"
              >
                {totalDesired}
              </td>
              <td
                style={{ color: '#005b00', fontSize: '1.25rem', fontWeight: 'bold', padding: '0 1rem' }}
                className="text-right text-mono"
              >
                {totalRequired}
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{'Всего осталось'}</span>
                <br />
                <span>{`(исключая излишки)`}</span>
              </td>
              <td
                style={{ color: '#922204', fontSize: '1.25rem', fontWeight: 'bold', padding: '0 1rem' }}
                className="text-right text-mono"
              >
                {remainsDesired}
              </td>
              <td
                style={{ color: '#922204', fontSize: '1.25rem', fontWeight: 'bold', padding: '0 1rem' }}
                className="text-right text-mono"
              >
                {remainsRequired}
              </td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                {'Процент собрано'}
                <br />
                {`(исключая излишки)`}
              </td>
              <td className="text-right text-mono">{totalDesiredPerc}</td>
              <td className="text-right text-mono">{totalRequiredPerc}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>
                {'Процент собрано'}
                <br />
                {`(включая излишки)`}
              </td>
              <td className="text-right text-mono">{formatPercentage(data.total / TOTAL_DESIRED)}</td>
              <td className="text-right text-mono">{formatPercentage(data.total / TOTAL_REQUIRED)}</td>
            </tr>

            <tr>
              <td style={{ maxWidth }}>{'Всего регионов участвуют'}</td>
              <td className="text-right text-mono">{nRegions}</td>
              <td className="text-right text-mono">{nRegions}</td>
            </tr>

            <tr>
              <td>{`Pегионов достигли цели`}</td>
              <td className="text-right text-mono">{nRegionsDesiredDone}</td>
              <td className="text-right text-mono">{nRegionsRequiredDone}</td>
            </tr>

            <tr>
              <td>{'Pегионов не достигли цели'}</td>
              <td className="text-right text-mono">{nRegionsDesiredRemain}</td>
              <td className="text-right text-mono">{nRegionsRequiredRemain}</td>
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
                {'% желаем.'}
                <br />
                <small>{`(из ${N_PER_REGION_DESIRED})`}</small>
              </th>
              <th>
                {'% необх.'}
                <br />
                <small>{`(из ${N_PER_REGION_MAX})`}</small>
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
  const { percRequired, percDesired, color, valueFormatted } = useMemo(() => {
    if (!value) {
      return {
        color: undefined,
        percRequired: '?',
        percDesired: '?',
        valueFormatted: '?',
      };
    }

    const percRequired = value / N_PER_REGION_MAX;
    const percDesired = value / N_PER_REGION_DESIRED;

    let color = '#222';
    if (percRequired < 1) {
      color = '#922204';
    }
    if (percRequired >= 1 && percDesired < 1) {
      color = '#7d4200';
    }
    if (percDesired >= 1) {
      color = '#005b00';
    }

    return {
      color,
      percRequired: formatPercentage(percRequired),
      percDesired: formatPercentage(percDesired),
      valueFormatted: value,
    };
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
        <span style={{ color }}>{region}</span>
      </td>
      <td className="text-right text-mono">{<span style={{ color }}>{valueFormatted}</span>}</td>
      <td style={{ minWidth: '80px' }} className="text-right text-mono">
        {<span style={{ color }}>{percDesired}</span>}
      </td>
      <td style={{ minWidth: '80px' }} className="text-right text-mono">
        {<span style={{ color }}>{percRequired}</span>}
      </td>
    </tr>
  );
}
