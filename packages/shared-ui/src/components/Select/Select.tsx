import { useId, type JSX } from 'react';

import { Icon } from '../Icon';
import type { SelectProps } from './Select.types';
import styles from './Select.module.scss';

/**
 * Native select dropdown styled to match the Design System (`48px` height, `12px` radius).
 * @param props Options array, label, placeholder, validation state, and select attributes.
 * @returns Accessible labeled select dropdown.
 */
export function Select({
  id,
  options,
  label,
  placeholder,
  state = 'default',
  helperText,
  errorText,
  fullWidth = true,
  className,
  ...rest
}: SelectProps): JSX.Element {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const resolvedState = errorText ? 'error' : state;
  const message = resolvedState === 'error' ? errorText : helperText;
  const messageId = message ? `${selectId}-msg` : undefined;

  const selectClasses = [
    styles.sharedSelectElement,
    resolvedState === 'success' ? styles.sharedSelectSuccess : '',
    resolvedState === 'error' ? styles.sharedSelectError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.sharedSelectGroup} ${fullWidth ? styles.sharedSelectFullWidth : ''} shared-select`}>
      {label ? (
        <label htmlFor={selectId} className={styles.sharedSelectLabel}>
          {label}
        </label>
      ) : null}
      <div className={styles.sharedSelectControl}>
        <select
          id={selectId}
          className={selectClasses}
          aria-invalid={resolvedState === 'error' || undefined}
          aria-describedby={messageId}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.sharedSelectChevron} aria-hidden="true">
          <Icon name="chevron-down" size={16} />
        </span>
      </div>
      {message ? (
        <p
          id={messageId}
          className={resolvedState === 'error' ? styles.sharedSelectErrorMessage : styles.sharedSelectHelper}
          role={resolvedState === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
