import type { JSX } from 'react';

import type { BadgeProps, BadgeTone } from './Badge.types';
import styles from './Badge.module.scss';

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: styles.sharedBadgeSuccess ?? '',
  warning: styles.sharedBadgeWarning ?? '',
  error: styles.sharedBadgeError ?? '',
  info: styles.sharedBadgeInfo ?? '',
  progress: styles.sharedBadgeProgress ?? '',
};

/**
 * Status badge / tag using the Design System chip color sets (`26px` pill).
 * Always pair with text or an icon so status never relies on color alone.
 * @param props Badge label, semantic tone, and optional indicator dot/icon.
 * @returns Styled pill badge element.
 */
export function Badge({
  children,
  tone = 'info',
  showDot = true,
  icon,
  className,
}: BadgeProps): JSX.Element {
  const classNames = [styles.sharedBadge, 'shared-badge', TONE_CLASSES[tone], className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {icon ?? (showDot ? <span className={styles.sharedBadgeDot} aria-hidden="true" /> : null)}
      <span>{children}</span>
    </span>
  );
}
