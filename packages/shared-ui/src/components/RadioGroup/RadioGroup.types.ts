export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: readonly RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}
