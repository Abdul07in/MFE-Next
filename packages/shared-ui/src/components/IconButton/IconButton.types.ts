import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonVariant } from '../Button/Button.types';

export type IconButtonSize = 'sm' | 'md';
export type IconButtonShape = 'square' | 'round';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  icon: ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  ctaShadow?: boolean;
}
