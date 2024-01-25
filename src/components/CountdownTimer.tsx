import { DateTime } from 'luxon';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>{'Что, всё? Может и нет. Уточняйте в официальных источниках!'}</span>;
  } else {
    return <span>{`Осталось: ${days} д. ${hours} ч. ${minutes} мин. ${seconds} с.`}</span>;
  }
};

export function CountdownTimer() {
  const d1 = DateTime.fromISO('2024-01-25T20:59:59.999Z');
  const d2 = DateTime.fromISO('2024-01-31T20:59:59.999Z');
  const now = DateTime.utc();

  return (
    <div>
      <p>
        <b className={now > d1 && 'strike'}>{'Окончание сбора подписей: чт, 25 янв. 2024 г., 23:59:59 мск.'}</b>
        <br />
        <Countdown date={d1.toJSDate()} renderer={renderer} />
      </p>

      <p>
        <b className={now > d2 && 'strike'}>{'Срок подачи подписей в ЦИК: ср, 31 янв. 2024 г., 23:59:59 мск.'}</b>
        <br />
        <Countdown date={d2.toJSDate()} renderer={renderer} />
      </p>
    </div>
  );
}
