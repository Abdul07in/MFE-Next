import type { ReactNode } from 'react';

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'progress';

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  showDot?: boolean;
  icon?: ReactNode;
  className?: string;
}
