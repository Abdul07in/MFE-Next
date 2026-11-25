import type { JSX } from 'react';

import type { DistributorHeaderProps } from './DistributorHeader.types';
import styles from './DistributorHeader.module.scss';

/**
 * Renders a simple distributor header for debugging and layout scaffolding.
 * @param props Header title to display.
 * @returns Header section for distributor pages.
 */
export function DistributorHeader({ title }: DistributorHeaderProps): JSX.Element {
  const safeTitle = title?.trim() || 'Distributor';

  return (
    <header className={`${styles.distributorHeader} distributor-header`}>
      <h1 className={`${styles.distributorHeaderTitle} distributor-header__title`}>{safeTitle}</h1>
    </header>
  );
}
