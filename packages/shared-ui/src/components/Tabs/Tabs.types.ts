import type { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: readonly TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  children?: ReactNode;
  'aria-label'?: string;
  className?: string;
}
