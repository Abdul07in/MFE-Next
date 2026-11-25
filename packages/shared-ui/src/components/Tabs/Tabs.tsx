'use client';

import type { JSX, KeyboardEvent } from 'react';

import type { TabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';

/**
 * Underline tab bar (`3px` `#DC6009` indicator) with full WAI-ARIA tablist keyboard navigation.
 * @param props Tab items, active tab id, change handler, and optional panel content.
 * @returns Tablist header and optional tabpanel container.
 */
export function Tabs({
  items,
  activeId,
  onChange,
  children,
  'aria-label': ariaLabel = 'Sections',
  className,
}: TabsProps): JSX.Element {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    const enabled = items.filter((item) => !item.disabled);
    if (enabled.length === 0) return;

    const currentItem = items[index];
    const currentEnabledIdx = currentItem ? enabled.findIndex((item) => item.id === currentItem.id) : -1;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = enabled[(currentEnabledIdx + 1) % enabled.length];
      if (next) onChange(next.id);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = enabled[(currentEnabledIdx - 1 + enabled.length) % enabled.length];
      if (prev) onChange(prev.id);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const first = enabled[0];
      if (first) onChange(first.id);
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = enabled[enabled.length - 1];
      if (last) onChange(last.id);
    }
  };

  return (
    <div className={`${styles.sharedTabs} shared-tabs ${className ?? ''}`}>
      <div className={styles.sharedTabsList} role="tablist" aria-label={ariaLabel}>
        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`${styles.sharedTabsButton} ${isActive ? styles.sharedTabsButtonActive : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {children ? (
        <div role="tabpanel" className={styles.sharedTabsPanel}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
