import type { Metadata } from 'next';
import type { JSX } from 'react';

import { buildMetadata } from '@platform/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Investor Home',
  description: 'Explore funds, returns, and portfolio insights.',
  path: '/',
});

export default function HomePage(): JSX.Element {
  return (
    <main>
      <h1>Investor Home</h1>
      <p>Welcome to the investor experience.</p>
    </main>
  );
}
