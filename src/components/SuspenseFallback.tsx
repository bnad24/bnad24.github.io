'use client';

export function SuspenseFallback() {
  return <div>{'Loading'}</div>;
}

export const SUSPENSE_FALLBACK = <SuspenseFallback />;
