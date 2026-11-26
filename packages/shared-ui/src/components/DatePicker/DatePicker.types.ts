import type { FieldState } from '../Input/Input.types';

export interface DatePickerProps {
  /** Selected date formatted as `YYYY-MM-DD`, or an empty string when unset. */
  value?: string;
  /** Convenience callback invoked with `YYYY-MM-DD` when valid, or `''` when cleared/invalid. */
  onValueChange?: (value: string) => void;
  /** Visible field label rendered above the date input. */
  label?: string;
  /** Display format passed to MUI DatePicker (defaults to `DD/MM/YYYY`). */
  format?: string;
  /** Validation visual state (`default`, `success`, `error`). */
  state?: FieldState;
  /** Helper caption shown below the field when not in error state. */
  helperText?: string;
  /** Validation error text shown below the field. */
  errorText?: string;
  /** Minimum selectable date formatted as `YYYY-MM-DD`. */
  minDate?: string;
  /** Maximum selectable date formatted as `YYYY-MM-DD`. */
  maxDate?: string;
  /** Prevents selecting dates after today. */
  disableFuture?: boolean;
  /** Prevents selecting dates before today. */
  disablePast?: boolean;
  /** Stretch control to container width (defaults to `true`). */
  fullWidth?: boolean;
  /** Disables field and calendar popup interaction. */
  disabled?: boolean;
  /** Marks the field read-only. */
  readOnly?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
  className?: string;
}
