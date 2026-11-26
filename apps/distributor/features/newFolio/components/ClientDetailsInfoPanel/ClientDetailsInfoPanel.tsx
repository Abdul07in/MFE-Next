import type { JSX } from 'react';

import { Card } from '@shared-ui/components/Card';

import { FOLIO_IDENTIFICATION_COPY } from '../../constants';
import type { ClientDetailsInfoPanelProps } from './ClientDetailsInfoPanel.types';
import styles from './ClientDetailsInfoPanel.module.scss';

/**
 * Left informational rail for Step 1 (Client Details), showing CVL KRA identification details and Helpful Tips.
 * Reuses the shared `Card` primitive from `@shared-ui/components/Card`.
 * @param props Optional styling overrides.
 * @returns Responsive aside panel.
 */
export function ClientDetailsInfoPanel({ className }: ClientDetailsInfoPanelProps): JSX.Element {
  return (
    <aside
      className={`${styles.clientDetailsAside} client-details-aside ${className ?? ''}`}
      aria-label="Customer identification guidance"
    >
      <Card variant="default" padding="md" className={styles.clientDetailsIntroCard}>
        <h2 className={styles.clientDetailsIntroTitle}>{FOLIO_IDENTIFICATION_COPY.title}</h2>
        <p className={styles.clientDetailsIntroBody}>{FOLIO_IDENTIFICATION_COPY.description}</p>
      </Card>

      <div className={styles.clientDetailsTipsCard}>
        <h3 className={styles.clientDetailsTipsHeading}>💡 {FOLIO_IDENTIFICATION_COPY.tipsHeading}</h3>
        <ul className={styles.clientDetailsTipsList}>
          {FOLIO_IDENTIFICATION_COPY.tips.map((tip) => (
            <li key={tip} className={styles.clientDetailsTipsItem}>
              <span className={styles.clientDetailsTipsDot} aria-hidden="true" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
