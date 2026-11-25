import type { JSX } from 'react';

import type { LeadCardProps } from './LeadCard.types';
import styles from './LeadCard.module.scss';

/**
 * Renders a distributor lead summary with current status.
 * @param props Typed lead model for card rendering.
 * @returns Lead card section element.
 */
export function LeadCard({ lead }: LeadCardProps): JSX.Element {
  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{lead.investorName}</h2>
      <p className={styles.meta}>Status: {lead.status}</p>
    </article>
  );
}
