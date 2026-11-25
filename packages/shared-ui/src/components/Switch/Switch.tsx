import { useId, type JSX } from 'react';

import type { SwitchProps } from './Switch.types';
import styles from './Switch.module.scss';

/**
 * Accessible toggle switch (`role="switch"`) aligned with the Design System tokens.
 * @param props Checked boolean state, toggle callback, and label or aria-label.
 * @returns Toggle switch control with optional visible label.
 */
export function Switch({
  checked,
  onChange,
  label,
  'aria-label': ariaLabel,
  disabled = false,
  id,
  className,
}: SwitchProps): JSX.Element {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className={`${styles.sharedSwitchField} shared-switch ${className ?? ''}`}>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ? undefined : ariaLabel || 'Toggle'}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`${styles.sharedSwitchTrack} ${checked ? styles.sharedSwitchTrackChecked : ''}`}
      >
        <span
          className={`${styles.sharedSwitchThumb} ${checked ? styles.sharedSwitchThumbChecked : ''}`}
          aria-hidden="true"
        />
      </button>
      {label ? (
        <label htmlFor={switchId} className={styles.sharedSwitchLabel}>
          {label}
        </label>
      ) : null}
    </div>
  );
}
