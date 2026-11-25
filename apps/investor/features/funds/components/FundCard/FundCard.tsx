import type { JSX } from 'react';

import type { FundCardProps } from './FundCard.types';
import styles from './FundCard.module.scss';

/**
 * Renders a single fund summary with key risk classification.
 * @param props Typed fund model for card rendering.
 * @returns Fund card section element.
 */
export function FundCard({ fund }: FundCardProps): JSX.Element {
  return (
    <article className={styles.card}>
      <h2 className={styles.name}>{fund.fundName}</h2>
      <p className={styles.meta}>Risk level: {fund.riskLevel}</p>
    </article>
  );
}
