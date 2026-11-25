import type { StaticImageData } from 'next/image';
import type { JSX } from 'react';

import {
  ARROW_RIGHT_ICON,
  CHECK_ICON,
  CHEVRON_DOWN_ICON,
  CLOSE_ICON,
  EDIT_ICON,
  PLUS_ICON,
  SEARCH_ICON,
} from '../../../../shared/utils/imageURL';
import type { IconProps, SharedIconName } from './Icon.types';
import styles from './Icon.module.scss';

const ICON_ASSETS: Record<SharedIconName, StaticImageData> = {
  check: CHECK_ICON,
  close: CLOSE_ICON,
  plus: PLUS_ICON,
  edit: EDIT_ICON,
  'arrow-right': ARROW_RIGHT_ICON,
  search: SEARCH_ICON,
  'chevron-down': CHEVRON_DOWN_ICON,
};

/**
 * Renders a shared SVG icon sourced from `packages/shared/assets/icons` via `packages/shared/utils/imageURL`.
 * Decorative by default (`aria-hidden="true"`); supply `label` for semantic icons.
 * @param props Icon name, sizing, and optional accessibility label.
 * @returns Masked icon element inheriting `currentColor`.
 */
export function Icon({
  name,
  size = 18,
  label,
  className,
}: IconProps): JSX.Element {
  const safeLabel = label?.trim();
  const classNames = [styles.icon, 'shared-icon', className ?? ''].filter(Boolean).join(' ');
  const iconMask = `url("${ICON_ASSETS[name].src}")`;

  return (
    <span
      className={classNames}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: iconMask,
        maskImage: iconMask,
      }}
      role={safeLabel ? 'img' : undefined}
      aria-label={safeLabel || undefined}
      aria-hidden={safeLabel ? undefined : true}
    />
  );
}
