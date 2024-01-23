'use client';

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div>
      <p>There was an error!</p>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>{'Reset'}</button>
    </div>
  );
}
