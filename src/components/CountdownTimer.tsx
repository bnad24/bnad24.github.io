'use client';

import { DateTime } from 'luxon';
import Link from 'next/link';
import React, { ReactNode, useCallback, useMemo } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { FaCheck, FaRegClock } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { formatDateMsk } from '../util/datetime';

export function CountdownTimer() {
  return (
    <div className="table-wrapper">
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
            name={'Срок подачи подписей в центральнyю избирательную комиссию (ЦИК)'}
            note={'Последний срок'}
            date={DateTime.fromISO('2024-01-31T18:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Завершено'}</span>}
          />

          <Event
            name={'Решение центральной избирательной комиссии (ЦИК) о регистрации кандидата'}
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
            name={'Голосование: досрочное, в России, начало'}
            note={'Досрочное голосование в России, в отдалённых и труднодоступных местностях'}
            date={DateTime.fromISO('2024-02-25T08:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Начато'}</span>}
          />

          <Event
            name={'Голосование: досрочное, за границей, начало'}
            note={'Досрочное голосование за границей (в посольствах и консульствах)'}
            date={DateTime.fromISO('2024-03-01T08:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Начато'}</span>}
          />

          <Event
            name={'Голосование: начало подачи заявления о голосовании вне помещения для голосования'}
            date={DateTime.fromISO('2024-03-07T08:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Начато'}</span>}
          />

          <Event
            name={'Агитация: окончание'}
            date={DateTime.fromISO('2024-03-14T23:59:59.999', { zone: 'Europe/Moscow' })}
            endText={<span>{'Окончено'}</span>}
          />

          <Event
            name={'Голосование: основное, начало'}
            note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
            date={DateTime.fromISO('2024-03-15T08:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Начато'}</span>}
          />

          <Event
            name={'🌞 "Полдень против Путина"'}
            note={
              'Рекомендуется приходить на избирательные участки в последний день голосования, вс 17 марта, к 12:00 по местному времени. Это - редкая возможность увидеть единомышленников, оценить их количество, познакомиться и пообщаться с ними, вместе поесть пирожков и выпить чайку, и всё это в безопасной атмосфере, на полностью легальном мероприятии. Рекомендуется отказаться от электронного голосования или голосования в компьютере, если будут предлагать. Голосовать только по бумажному бюллетеню и самому бросить его в урну для голосования, чтобы затруднить фальсификации. Счётчик показывает московское время'
            }
            date={DateTime.fromISO('2024-03-17T12:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Окончено'}</span>}
          />

          <Event
            name={'Голосование: окончание'}
            note={'Участки работают с 8:00 до 20:00 по местному времени; Счётчик показывает московское время'}
            date={DateTime.fromISO('2024-03-17T20:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Окончено'}</span>}
          />

          <Event
            name={'Подведение итогов по участкам в участковых избирательных комиссиях (УИК)'}
            date={DateTime.fromISO('2024-03-19T12:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Окончено'}</span>}
          />

          <Event
            name={'Подведение итогов по регионам в региональных избирательных комиссиях'}
            date={DateTime.fromISO('2024-03-21T12:00:00.000', { zone: 'Europe/Moscow' })}
            endText={<span>{'Окончено'}</span>}
          />

          <Event
            name={'Подведение окончательных итогов в центральной избирательной комиссии (ЦИК)'}
            note={
              'Официальная публикация результатов - в течение 3 дней с момента подписания протокола о результатах выборов'
            }
            date={DateTime.fromISO('2024-03-28T12:00:00.000', { zone: 'Europe/Moscow' })}
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

      <p>
        {
          'Источник: страница "Сроки осуществления избирательных действий", на сайте центральной избирательной комиссии, в версии на 29.01.2024 20:30 мск. '
        }
        <a target="_blank" rel="noreferrer" href="http://www.cikrf.ru/analog/prezidentskiye-vybory-2024/plan/">
          {'http://www.cikrf.ru/analog/prezidentskiye-vybory-2024/plan/'}
        </a>
      </p>
    </div>
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
