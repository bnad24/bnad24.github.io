import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { formatDate } from '../util/datetime';

export function UpdatedAt({ data }: { data: { updatedAt: string } }) {
  const updatedAt = useMemo(() => formatDate(DateTime.fromISO(data.updatedAt)), [data.updatedAt]);

  return (
    <p>
      <b>
        {'Обновлено: '}
        {updatedAt}
      </b>
    </p>
  );
}
