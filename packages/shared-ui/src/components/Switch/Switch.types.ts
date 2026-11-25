export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  'aria-label'?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}
