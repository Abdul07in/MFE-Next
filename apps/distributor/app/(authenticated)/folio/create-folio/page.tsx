import type { Metadata } from 'next';
import type { JSX } from 'react';

import {
  ClientDetailsInfoPanel,
  NewFolioClientFlow,
  NewFolioStepLayout,
} from '@features/newFolio';
import { ROUTES } from '@platform/constants/routes';
import { buildMetadata } from '@platform/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Create Folio - Client Details',
  description:
    'Start a new investor folio by verifying client mobile details, PAN, and FATCA compliance.',
  path: ROUTES.distributor.createFolio,
});

/**
 * Server-rendered Step 1 (Client Details) route for distributor folio creation (`/folio/create-folio`).
 * @returns Folio creation banner, identification guidance rail, and client details + FATCA workflow.
 */
export default function CreateFolioPage(): JSX.Element {
  return (
    <NewFolioStepLayout currentStep={1} aside={<ClientDetailsInfoPanel />}>
      <NewFolioClientFlow />
    </NewFolioStepLayout>
  );
}
