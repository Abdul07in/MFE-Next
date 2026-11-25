import type { JSX } from 'react';

import type { EmptyStateProps } from './EmptyState.types';
import styles from './EmptyState.module.scss';

/**
 * Displays a consistent empty state message block.
 * @param props Empty state content values.
 * @returns Empty state container with title and optional description.
 */
export function EmptyState({ title, description }: EmptyStateProps): JSX.Element {
  const safeTitle = title?.trim() || 'Nothing to display';

  return (
    <section className={`${styles.sharedEmptyState} shared-empty-state`} aria-live="polite">
      <h2 className={styles.sharedEmptyStateTitle}>{safeTitle}</h2>
      {description ? <p className={styles.sharedEmptyStateDescription}>{description}</p> : null}
    </section>
  );
}
