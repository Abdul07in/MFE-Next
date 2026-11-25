import type { TextareaHTMLAttributes } from 'react';

import type { FieldState } from '../Input/Input.types';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  state?: FieldState;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
}
