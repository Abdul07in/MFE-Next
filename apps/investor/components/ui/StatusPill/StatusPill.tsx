import type { JSX } from 'react';

import type { StatusPillProps } from './StatusPill.types';
import styles from './StatusPill.module.scss';

/**
 * Displays compact fund status information with accessible visual tone.
 * @param props Status text and visual tone selection.
 * @returns Styled status chip.
 */
export function StatusPill({ label, tone = 'neutral' }: StatusPillProps): JSX.Element {
  return <span className={`${styles.pill} ${styles[tone]}`}>{label}</span>;
}
