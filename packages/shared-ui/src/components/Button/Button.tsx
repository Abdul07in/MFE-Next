import type { JSX } from 'react';

import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import styles from './Button.module.scss';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: styles.sharedButtonPrimary ?? '',
  secondary: styles.sharedButtonSecondary ?? '',
  ghost: styles.sharedButtonGhost ?? '',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: styles.sharedButtonSm ?? '',
  md: styles.sharedButtonMd ?? '',
  lg: styles.sharedButtonLg ?? '',
};

/**
 * Shared design-system action button for investor and distributor flows.
 * Supports primary, secondary, and ghost variants with rectangular or pill shapes.
 * @param props Button visual configuration and native HTML button attributes.
 * @returns Styled button element.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  ctaShadow = false,
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = 'button',
  className,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = Boolean(disabled || loading);
  const classNames = [
    styles.sharedButton,
    'shared-button',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    pill ? styles.sharedButtonPill : '',
    ctaShadow ? styles.sharedButtonCtaShadow : '',
    fullWidth ? styles.sharedButtonFullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} disabled={isDisabled} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className={styles.sharedButtonSpinner} aria-hidden="true" /> : leftIcon}
      <span>{children}</span>
      {!loading ? rightIcon : null}
    </button>
  );
}
