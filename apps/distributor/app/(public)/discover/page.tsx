import type { Metadata } from 'next';
import type { JSX } from 'react';

import { buildMetadata } from '@platform/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Distributor Public Zone',
  description: 'Public content and onboarding discovery for partners.',
  path: '/discover',
});

export default function PublicLandingPage(): JSX.Element {
  return (
    <main>
      <h1>Distributor Public Zone</h1>
      <p>Public content and onboarding discovery for partners.</p>
    </main>
  );
}
