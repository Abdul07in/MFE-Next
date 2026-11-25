import type { JSX } from 'react';

import type { ChipProps } from './Chip.types';
import styles from './Chip.module.scss';

/**
 * Interactive pill chip for filters, quick amounts, and selectable options.
 * @param props Chip label, active state, and native button attributes.
 * @returns Pressable chip button with `aria-pressed` state.
 */
export function Chip({
  children,
  active = false,
  leftIcon,
  type = 'button',
  className,
  ...rest
}: ChipProps): JSX.Element {
  const classNames = [
    styles.sharedChip,
    'shared-chip',
    active ? styles.sharedChipActive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} aria-pressed={active} {...rest}>
      {leftIcon}
      <span>{children}</span>
    </button>
  );
}
