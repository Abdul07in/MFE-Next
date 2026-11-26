import type { JSX } from 'react';

import { DistributorHeader } from '@components/ui/DistributorHeader';

import { FolioBanner } from '../FolioBanner';
import type { NewFolioStepLayoutProps } from './NewFolioStepLayout.types';
import styles from './NewFolioStepLayout.module.scss';

/**
 * Page shell for the distributor folio creation wizard combining header, orange banner stepper, and 2-column body.
 * @param props Active step, left guidance rail, and right form column.
 * @returns Full-page layout container.
 */
export function NewFolioStepLayout({
  currentStep,
  aside,
  children,
}: NewFolioStepLayoutProps): JSX.Element {
  return (
    <div className={`${styles.newFolioPage} new-folio-page`}>
      <DistributorHeader activeNavId="dashboard" />
      <FolioBanner currentStep={currentStep} />
      <main className={styles.newFolioMain}>
        <div className={styles.newFolioWizardLayout}>
          {aside}
          <div className={styles.newFolioContentColumn}>{children}</div>
        </div>
      </main>
    </div>
  );
}
