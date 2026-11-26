import type { ReactNode } from 'react';

import type { FolioWizardStep } from '../../types';

export interface NewFolioStepLayoutProps {
  /** Active wizard step (`1`..`3`). */
  currentStep: FolioWizardStep;
  /** Left guidance rail content. */
  aside: ReactNode;
  /** Primary form column content. */
  children: ReactNode;
}
