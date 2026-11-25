import { useId, type JSX } from 'react';

import type { TextareaProps } from './Textarea.types';
import styles from './Textarea.module.scss';

/**
 * Multi-line text input aligned with the Design System form field tokens.
 * @param props Label, helper/error text, state, and native textarea attributes.
 * @returns Accessible labeled textarea field.
 */
export function Textarea({
  id,
  label,
  state = 'default',
  helperText,
  errorText,
  fullWidth = true,
  rows = 3,
  className,
  ...rest
}: TextareaProps): JSX.Element {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const resolvedState = errorText ? 'error' : state;
  const message = resolvedState === 'error' ? errorText : helperText;
  const messageId = message ? `${textareaId}-msg` : undefined;

  const textareaClasses = [
    styles.sharedTextareaElement,
    resolvedState === 'success' ? styles.sharedTextareaSuccess : '',
    resolvedState === 'error' ? styles.sharedTextareaError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.sharedTextareaGroup} ${fullWidth ? styles.sharedTextareaFullWidth : ''} shared-textarea`}>
      {label ? (
        <label htmlFor={textareaId} className={styles.sharedTextareaLabel}>
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        rows={rows}
        className={textareaClasses}
        aria-invalid={resolvedState === 'error' || undefined}
        aria-describedby={messageId}
        {...rest}
      />
      {message ? (
        <p
          id={messageId}
          className={resolvedState === 'error' ? styles.sharedTextareaErrorMessage : styles.sharedTextareaHelper}
          role={resolvedState === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
