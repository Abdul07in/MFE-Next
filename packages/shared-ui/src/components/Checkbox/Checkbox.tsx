import { useId, type JSX } from 'react';

import { Icon } from '../Icon';
import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

/**
 * Accessible checkbox control (`20px` box, `6px` radius, `#DC6009` checked fill).
 * @param props Checkbox label, checked state, and native checkbox input attributes.
 * @returns Labeled checkbox control.
 */
export function Checkbox({
  id,
  label,
  checked = false,
  disabled,
  className,
  ...rest
}: CheckboxProps): JSX.Element {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`${styles.sharedCheckbox} ${disabled ? styles.sharedCheckboxDisabled : ''} shared-checkbox ${
        className ?? ''
      }`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={styles.sharedCheckboxInput}
        {...rest}
      />
      <span
        className={`${styles.sharedCheckboxBox} ${checked ? styles.sharedCheckboxBoxChecked : ''}`}
        aria-hidden="true"
      >
        {checked ? <Icon name="check" size={12} strokeWidth={3} /> : null}
      </span>
      <span>{label}</span>
    </label>
  );
}
