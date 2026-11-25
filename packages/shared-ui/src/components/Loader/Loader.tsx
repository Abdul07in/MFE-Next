import type { JSX } from 'react';

import type { LoaderProps } from './Loader.types';
import styles from './Loader.module.scss';

/**
 * Renders an accessible loading indicator for async sections.
 * @param props Optional aria label override.
 * @returns Animated loader element with status semantics.
 */
export function Loader({ label = 'Loading' }: LoaderProps): JSX.Element {
  const safeLabel = label?.trim() || 'Loading';

  return (
    <span className={`${styles.sharedLoader} shared-loader`} role="status" aria-label={safeLabel}>
      <span className={styles.sharedLoaderDot} aria-hidden="true" />
      <span>{safeLabel}</span>
    </span>
  );
}
