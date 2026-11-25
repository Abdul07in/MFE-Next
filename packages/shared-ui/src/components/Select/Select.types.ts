import type { SelectHTMLAttributes } from 'react';

import type { FieldState } from '../Input/Input.types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  label?: string;
  placeholder?: string;
  state?: FieldState;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
}
