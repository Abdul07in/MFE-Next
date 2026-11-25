'use client';

import { useEffect, type JSX } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element {
  useEffect(() => {
    // Route-level error boundary logging hook.
    console.error('Investor route error:', error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>Please try refreshing this page.</p>
      <button type="button" onClick={reset}>
        Retry
      </button>
    </main>
  );
}
