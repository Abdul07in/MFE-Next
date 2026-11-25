import type { JSX } from 'react';

import type { PageShellProps } from './PageShell.types';
import styles from './PageShell.module.scss';

/**
 * Provides consistent page width and heading layout.
 * @param props Shell heading and content.
 * @returns Wrapped page layout section.
 */
export function PageShell({ title, children }: PageShellProps): JSX.Element {
  return (
    <section className={styles.shell}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </section>
  );
}
