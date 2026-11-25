'use client';

import { useEffect, useId, type JSX } from 'react';

import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import type { ModalProps } from './Modal.types';
import styles from './Modal.module.scss';

/**
 * Blocking confirmation/decision dialog (`20px` radius, `420px` max width, 55% scrim).
 * Closes on Escape key press and optionally on backdrop click.
 * @param props Open state, close handler, heading, description, body, and footer actions.
 * @returns Accessible modal dialog when open, or null when closed.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  closeOnBackdrop = true,
  className,
}: ModalProps): JSX.Element | null {
  const titleId = useId();
  const descriptionId = useId();
  const safeTitle = title?.trim() || 'Confirm action';

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`${styles.sharedModalBackdrop} shared-modal-backdrop`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={`${styles.sharedModalDialog} shared-modal ${className ?? ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <IconButton
          variant="ghost"
          size="sm"
          shape="round"
          aria-label="Close dialog"
          icon={<Icon name="close" size={16} />}
          onClick={onClose}
          className={styles.sharedModalClose}
        />
        <h2 id={titleId} className={styles.sharedModalTitle}>
          {safeTitle}
        </h2>
        {description ? (
          <p id={descriptionId} className={styles.sharedModalDescription}>
            {description}
          </p>
        ) : null}
        {children ? <div className={styles.sharedModalBody}>{children}</div> : null}
        {actions ? <div className={styles.sharedModalActions}>{actions}</div> : null}
      </div>
    </div>
  );
}
