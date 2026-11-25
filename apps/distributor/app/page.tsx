import type { Metadata } from 'next';
import type { JSX } from 'react';

import { buildMetadata } from '@platform/seo/metadata';
import { DistributorHeader } from '../components/ui/DistributorHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Distributor Home',
  description: 'Manage leads, reports, and distributor workflows.',
  path: '/',
});

export default function HomePage(): JSX.Element {
  return <DistributorHeader title="Distributor" />;
}
