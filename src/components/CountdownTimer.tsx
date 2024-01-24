import { DateTime } from 'luxon';
import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  } else {
    return <span>{`Осталось: ${days} д. ${hours} ч. ${minutes} мин. ${seconds} с.`}</span>;
  }
};

export function CountdownTimer() {
  return (
    <div>
      <p>
        <b>{'Окончание сбора подписей: чт, 25 янв. 2024 г., 23:59:59 мск.'}</b>
        <br />
        <Countdown date={DateTime.fromISO('2024-01-25T20:59:59.999Z').toJSDate()} renderer={renderer} />
      </p>

      <p>
        <b>{'Срок подачи подписей в ЦИК: ср, 31 янв. 2024 г., 23:59:59 мск.'}</b>
        <br />
        <Countdown date={DateTime.fromISO('2024-01-31T20:59:59.999Z').toJSDate()} renderer={renderer} />
      </p>
    </div>
  );
}
