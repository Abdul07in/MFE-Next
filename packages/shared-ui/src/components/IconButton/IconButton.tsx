import type { JSX } from 'react';

import type { ButtonVariant } from '../Button/Button.types';
import type { IconButtonProps, IconButtonSize } from './IconButton.types';
import styles from './IconButton.module.scss';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: styles.sharedIconButtonPrimary ?? '',
  secondary: styles.sharedIconButtonSecondary ?? '',
  ghost: styles.sharedIconButtonGhost ?? '',
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
  sm: styles.sharedIconButtonSm ?? '',
  md: '',
};

/**
 * Compact square or round icon-only action button with mandatory accessible label.
 * @param props Icon node, required aria-label, variant, size, and shape.
 * @returns Accessible icon button element.
 */
export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  shape = 'square',
  ctaShadow = false,
  type = 'button',
  className,
  ...rest
}: IconButtonProps): JSX.Element {
  const classNames = [
    styles.sharedIconButton,
    'shared-icon-button',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    shape === 'round' ? styles.sharedIconButtonRound : '',
    ctaShadow ? styles.sharedIconButtonCtaShadow : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} {...rest}>
      {icon}
    </button>
  );
}
