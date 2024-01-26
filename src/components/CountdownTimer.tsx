import { DateTime } from 'luxon';
import Link from 'next/link';
import { ReactNode, useCallback, useMemo } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { formatDateMsk } from '../util/datetime';

export function CountdownTimer() {
  return (
    <table>
      <tbody>
        <Event
          name={'Окончание сбора подписей'}
          date={DateTime.fromISO('2024-01-25T23:59:59.999', { zone: 'Europe/Moscow' })}
          endText={
            <span>
              {
                'Сбор продолжается в некоторых регионах. Уточняйте в официльных источниках (см. выше) и на нашей странице '
              }
              <Link href="/addresses">{'Aдресов штабов'}</Link>
              {''}
            </span>
          }
        />

        <Event
          name={'Срок подачи подписей в ЦИК'}
          note={'Последний срок'}
          date={DateTime.fromISO('2024-01-31T18:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Завершено'}</span>}
        />

        <Event
          name={'Решение ЦИК о регистрации кандидата'}
          note={'Последний срок'}
          date={DateTime.fromISO('2024-01-31T18:00:00.000', { zone: 'Europe/Moscow' }).plus({ day: 10 })}
          endText={<span>{'Завершено'}</span>}
        />

        <Event
          name={'Агитация: начало'}
          date={DateTime.fromISO('2024-02-17T00:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Начато'}</span>}
        />

        <Event
          name={'Агитация: окончание'}
          date={DateTime.fromISO('2024-03-14T23:59:59.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />

        <Event
          name={'Выборы: начало голосования'}
          note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
          date={DateTime.fromISO('2024-03-15T08:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Начато'}</span>}
        />

        <Event
          name={'Выборы: окончание голосования'}
          note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
          date={DateTime.fromISO('2024-03-17T20:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />

        <Event
          name={'Инаугурация президента'}
          date={DateTime.fromISO('2024-05-07T12:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />
      </tbody>
    </table>
  );
}

function Event({
  name,
  note,
  date,
  endText,
}: {
  name: ReactNode;
  note?: ReactNode;
  date: DateTime;
  endText: ReactNode;
}) {
  const now = useMemo(() => DateTime.utc(), []);

  const renderer: CountdownRendererFn = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return endText;
      } else {
        return <span className="text-mono">{`Осталось: ${days} д. ${hours} ч. ${minutes} мин. ${seconds} с.`}</span>;
      }
    },
    [endText],
  );

  return (
    <tr>
      <td>
        <b className={now > date && 'strike'}>{name}</b>
        <br />
        {!!note && <small>{note}</small>}
        {!!note && <br />}
      </td>

      <td>
        <span className="text-mono">{formatDateMsk(date)}</span>
        <br />
        <Countdown date={date.toJSDate()} renderer={renderer} />
      </td>
    </tr>
  );
}
