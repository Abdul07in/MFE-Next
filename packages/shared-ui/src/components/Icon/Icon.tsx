import type { JSX, ReactNode } from 'react';

import type { IconProps, SharedIconName } from './Icon.types';
import styles from './Icon.module.scss';

const ICON_PATHS: Record<SharedIconName, (strokeWidth: number) => ReactNode> = {
  check: (strokeWidth) => (
    <path
      d="M5 12.5l4.5 4.5L19 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  close: (strokeWidth) => (
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  ),
  plus: (strokeWidth) => (
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  ),
  edit: (strokeWidth) => (
    <path
      d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'arrow-right': (strokeWidth) => (
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  search: (strokeWidth) => (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  'chevron-down': (strokeWidth) => (
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

/**
 * Renders a shared SVG vector icon aligned with the ICICI Pru Design System.
 * Decorative by default (`aria-hidden="true"`); supply `label` for semantic icons.
 * @param props Icon name, sizing, and optional accessibility label.
 * @returns Inline SVG element.
 */
export function Icon({
  name,
  size = 18,
  strokeWidth = 2.2,
  label,
  className,
}: IconProps): JSX.Element {
  const safeLabel = label?.trim();
  const classNames = [styles.icon, 'shared-icon', className ?? ''].filter(Boolean).join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={classNames}
      role={safeLabel ? 'img' : undefined}
      aria-label={safeLabel || undefined}
      aria-hidden={safeLabel ? undefined : true}
      focusable="false"
    >
      {ICON_PATHS[name](strokeWidth)}
    </svg>
  );
}
