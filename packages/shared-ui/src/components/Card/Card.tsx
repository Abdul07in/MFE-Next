import type { JSX } from 'react';

import type { CardPadding, CardProps, CardVariant } from './Card.types';
import styles from './Card.module.scss';

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: styles.sharedCardDefault ?? '',
  selected: styles.sharedCardSelected ?? '',
  info: styles.sharedCardInfo ?? '',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: styles.sharedCardPadNone ?? '',
  sm: styles.sharedCardPadSm ?? '',
  md: styles.sharedCardPadMd ?? '',
  lg: styles.sharedCardPadLg ?? '',
};

/**
 * Surface container grouping related content with Design System radius, border, and elevation.
 * @param props Card variant, padding scale, hover behavior, and container element tag.
 * @returns Rendered card container.
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  as = 'div',
  className,
  ...rest
}: CardProps): JSX.Element {
  const Component = as;
  const classNames = [
    styles.sharedCard,
    'shared-card',
    VARIANT_CLASSES[variant],
    PADDING_CLASSES[padding],
    hoverable ? styles.sharedCardHoverable : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}
