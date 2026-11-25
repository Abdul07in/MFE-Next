import type { Metadata } from 'next';
import type { JSX } from 'react';

import { buildMetadata } from '@platform/seo/metadata';

import { PageShell } from '../components/layout/PageShell';
import { DistributorHeader } from '../components/ui/DistributorHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Distributor Home',
  description: 'Manage leads, reports, and distributor workflows.',
  path: '/',
});

/**
 * Server-rendered home route for the distributor platform.
 * @returns Distributor navigation header and landing page shell.
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      <DistributorHeader />
      <main>
        <PageShell title="Distributor">
          <p>Manage investor onboarding, folio creation, and distributor workflows.</p>
        </PageShell>
      </main>
    </>
  );
}
