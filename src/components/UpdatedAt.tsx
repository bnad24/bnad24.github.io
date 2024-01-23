import { DateTime } from 'luxon';
import { useMemo } from 'react';
import type { SignJson } from '../types';

export function UpdatedAt({ data }: { data: SignJson }) {
  const updatedAt = useMemo(
    () => DateTime.fromISO(data.updatedAt).setLocale('ru').toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY),
    [data.updatedAt],
  );

  return (
    <p>
      <b>
        {'Обновлено: '}
        {updatedAt}
      </b>
    </p>
  );
}
