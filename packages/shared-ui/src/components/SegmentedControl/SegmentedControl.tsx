'use client';

import type { JSX } from 'react';

import type { SegmentedControlProps } from './SegmentedControl.types';
import styles from './SegmentedControl.module.scss';

/**
 * Pill-style segmented mode switcher (`46px` control height) from the Design System.
 * @param props Options list, currently selected value, change handler, and aria-label.
 * @returns Accessible radiogroup segmented switch.
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  'aria-label': ariaLabel = 'Mode selection',
  className,
}: SegmentedControlProps): JSX.Element {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${styles.sharedSegmentedControl} shared-segmented-control ${className ?? ''}`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={`${styles.sharedSegmentedButton} ${
              isActive ? styles.sharedSegmentedButtonActive : ''
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
