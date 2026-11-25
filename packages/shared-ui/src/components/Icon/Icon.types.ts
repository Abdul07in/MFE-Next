export type SharedIconName =
  | 'check'
  | 'close'
  | 'plus'
  | 'edit'
  | 'arrow-right'
  | 'search'
  | 'chevron-down';

export interface IconProps {
  name: SharedIconName;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}
