import { DateTime } from 'luxon';
import { useMemo } from 'react';
import type { SignJson } from '../types';
import { formatDate } from '../util/datetime';

export function UpdatedAt({ data }: { data: SignJson }) {
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
