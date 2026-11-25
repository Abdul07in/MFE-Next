import type { Metadata } from 'next';
import type { JSX } from 'react';

import { buildMetadata } from '@platform/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Investor Public Zone',
  description: 'Public content and discoverability surface.',
  path: '/discover',
});

export default function PublicLandingPage(): JSX.Element {
  return (
    <main>
      <h1>Investor Public Zone</h1>
      <p>Public content and discoverability surface.</p>
    </main>
  );
}
