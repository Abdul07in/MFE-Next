import type { ReactNode } from 'react';

export interface SegmentedOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: readonly SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}
