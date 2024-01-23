import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useJson<T>(url: string) {
  if (typeof window === 'undefined') {
    return undefined;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryKey = useMemo(() => [url], [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      return await (await fetch(`${window.location.href}/${url}`)).json();
    },
  });

  if (error) {
    throw error;
  }
  return data as T;
}
