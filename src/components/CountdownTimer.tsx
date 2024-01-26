import { DateTime } from 'luxon';
import Link from 'next/link';
import React, { ReactNode, useCallback, useMemo } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { FaCheck, FaRegClock } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { formatDateMsk } from '../util/datetime';

export function CountdownTimer() {
  return (
    <table className="striped">
      <tbody>
        <Event
          name={'Окончание сбора подписей'}
          date={DateTime.fromISO('2024-01-25T23:59:59.999', { zone: 'Europe/Moscow' })}
          note={
            <span>
              <a target="_blank" rel="noreferrer" href="https://t.me/BorisNadezhdin/699">
                {'Сбор продолжается в некоторых регионах'}
              </a>
              {'. Уточняйте в официльных источниках (см. выше) и на нашей странице '}
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
          date={DateTime.fromISO('2024-03-14T23:59:59.999', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />

        <Event
          name={'Голосование: начало'}
          note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
          date={DateTime.fromISO('2024-03-15T08:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Начато'}</span>}
        />

        <Event
          name={'Голосование: окончание'}
          note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
          date={DateTime.fromISO('2024-03-17T20:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />

        <Event
          name={'Инаугурация избранного президента'}
          date={DateTime.fromISO('2024-05-07T12:00:00.000', { zone: 'Europe/Moscow' })}
          endText={<span>{'Окончено'}</span>}
        />

        <Event
          name={'Окончание срока избранного президента'}
          date={DateTime.fromISO('2030-05-07T12:00:00.000', { zone: 'Europe/Moscow' })}
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
  endText?: ReactNode;
}) {
  const now = useMemo(() => DateTime.utc(), []);

  const renderer: CountdownRendererFn = useCallback(
    ({ days, hours, minutes, seconds, completed }) => {
      let text = `${days} д. ${hours} ч. ${minutes} мин. ${seconds} с.`;
      if (days >= 365) {
        const years = Math.floor(days / 365); // FIXME: naive date interval calculation is inexact
        days = days % 365; // FIXME: naive date interval calculation is inexact
        text = `${years} лет ${days} д. ${hours} ч. ${minutes} мин. ${seconds} с.`;
      }

      if (completed) {
        return endText;
      } else {
        return (
          <span className="text-mono">
            <MdTimer color="grey" size={12} />
            <span> </span>
            <span>{text}</span>
          </span>
        );
      }
    },
    [endText],
  );

  const icon = useMemo(() => {
    if (now > date) {
      return <FaCheck color="#3c8e21" size={18} />;
    }
    return <FaRegClock color="grey" size={18} />;
  }, [date, now]);

  return (
    <tr>
      <td>{icon}</td>
      <td style={{ maxWidth: '300px', minWidth: '150px' }}>
        <b>{name}</b>
        <br />
        {!!note && <small>{note}</small>}
        {!!note && <br />}
      </td>

      <td style={{ minWidth: '270px' }}>
        <div style={{ paddingBottom: '2px' }} className="text-mono">
          <FaRegClock color="grey" size={11} />{' '}
          <span className={now > date && 'strike'}>
            <b>{formatDateMsk(date)}</b>
          </span>
        </div>
        <div>
          <Countdown date={date.toJSDate()} renderer={renderer} />
        </div>
      </td>
    </tr>
  );
}
