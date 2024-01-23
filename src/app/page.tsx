'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Main } from '../components/Main';
import { ErrorFallback } from '../components/ErrorFallback';
import { SUSPENSE_FALLBACK } from '../components/SuspenseFallback';

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={SUSPENSE_FALLBACK}></Suspense>
      <Main />
    </ErrorBoundary>
  );
}
