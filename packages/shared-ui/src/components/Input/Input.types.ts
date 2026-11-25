import type { InputHTMLAttributes, ReactNode } from 'react';

export type FieldState = 'default' | 'success' | 'error';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  state?: FieldState;
  helperText?: string;
  errorText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
}
