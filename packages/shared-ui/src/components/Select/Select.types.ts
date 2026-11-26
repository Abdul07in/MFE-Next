import type { SelectChangeEvent } from '@mui/material/Select';

import type { FieldState } from '../Input/Input.types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'md' | 'sm';

export interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  state?: FieldState;
  size?: SelectSize;
  helperText?: string;
  errorText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
  className?: string;
}
