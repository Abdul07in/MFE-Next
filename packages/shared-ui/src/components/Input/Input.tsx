import { useId, type JSX } from 'react';

import type { InputProps } from './Input.types';
import styles from './Input.module.scss';

/**
 * Standard text field aligned with the Design System (`48px` height, `12px` radius, `1.5px` border).
 * Automatically associates label, helper text, and error messaging for WCAG 2.2 AA compliance.
 * @param props Input label, validation state, adornments, and native input attributes.
 * @returns Accessible labeled text input block.
 */
export function Input({
  id,
  label,
  state = 'default',
  helperText,
  errorText,
  startAdornment,
  endAdornment,
  fullWidth = true,
  disabled,
  className,
  ...rest
}: InputProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const resolvedState = errorText ? 'error' : state;
  const message = resolvedState === 'error' ? errorText : helperText;
  const messageId = message ? `${inputId}-msg` : undefined;

  const controlClasses = [
    styles.sharedInputControl,
    resolvedState === 'success' ? styles.sharedInputSuccess : '',
    resolvedState === 'error' ? styles.sharedInputError : '',
    disabled ? styles.sharedInputDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.sharedInputElement,
    startAdornment ? styles.sharedInputWithStart : '',
    endAdornment ? styles.sharedInputWithEnd : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.sharedInputGroup} ${fullWidth ? styles.sharedInputFullWidth : ''} shared-input`}>
      {label ? (
        <label htmlFor={inputId} className={styles.sharedInputLabel}>
          {label}
        </label>
      ) : null}
      <div className={controlClasses}>
        {startAdornment ? <span className={styles.sharedInputAdornmentStart}>{startAdornment}</span> : null}
        <input
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={resolvedState === 'error' || undefined}
          aria-describedby={messageId}
          {...rest}
        />
        {endAdornment ? <span className={styles.sharedInputAdornmentEnd}>{endAdornment}</span> : null}
      </div>
      {message ? (
        <p
          id={messageId}
          className={resolvedState === 'error' ? styles.sharedInputErrorMessage : styles.sharedInputHelper}
          role={resolvedState === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
