import { DateTime } from 'luxon';

export function formatDate(dt: DateTime): string {
  return dt.setLocale('ru').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
}

export function formatDateMsk(dt: DateTime): string {
  return dt.setLocale('ru').setZone('Europe/Moscow').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) + ' мск';
}
