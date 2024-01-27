'use client';

import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PlausibleProvider from 'next-plausible';
import { ErrorFallback } from './components/ErrorFallback';
import { SUSPENSE_FALLBACK } from './components/SuspenseFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();
  const domain = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.host;
    }
    return undefined;
  }, []);
  return (
    <PlausibleProvider domain={domain} trackFileDownloads trackOutboundLinks>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={SUSPENSE_FALLBACK}>{children}</Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
