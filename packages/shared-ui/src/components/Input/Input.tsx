import { useId, type JSX } from 'react';

import type { InputProps } from './Input.types';
import styles from './Input.module.scss';

/**
 * Standard text field aligned with the Design System (`48px` height, `12px` radius, `1.5px` border).
 * Automatically associates label, optional attached footer bar, helper text, and error messaging.
 * @param props Input label, validation state, adornments, attached footer, and native input attributes.
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
  attachedFooter,
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
    attachedFooter ? styles.sharedInputWithFooter : '',
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
      <div className={styles.sharedInputFieldWrapper}>
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
        {attachedFooter ? <div className={styles.sharedInputAttachedFooter}>{attachedFooter}</div> : null}
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
