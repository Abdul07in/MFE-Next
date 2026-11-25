import type { JSX } from 'react';

import type { RadioGroupProps } from './RadioGroup.types';
import styles from './RadioGroup.module.scss';

/**
 * Accessible radio group using native `<input type="radio">` semantics with Design System styling.
 * @param props Radio group name, options, active value, and change callback.
 * @returns Fieldset containing labeled radio options.
 */
export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  orientation = 'vertical',
  className,
}: RadioGroupProps): JSX.Element {
  return (
    <fieldset className={`${styles.sharedRadioGroup} shared-radio-group ${className ?? ''}`}>
      {label ? <legend className={styles.sharedRadioGroupLegend}>{label}</legend> : null}
      <div
        className={`${styles.sharedRadioGroupList} ${
          orientation === 'horizontal' ? styles.sharedRadioGroupHorizontal : ''
        }`}
      >
        {options.map((option) => {
          const isChecked = value === option.value;
          return (
            <label
              key={option.value}
              className={`${styles.sharedRadioOption} ${
                option.disabled ? styles.sharedRadioOptionDisabled : ''
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={option.disabled}
                onChange={() => onChange?.(option.value)}
                className={styles.sharedRadioInput}
              />
              <span
                className={`${styles.sharedRadioControl} ${
                  isChecked ? styles.sharedRadioControlChecked : ''
                }`}
                aria-hidden="true"
              >
                {isChecked ? <span className={styles.sharedRadioDot} /> : null}
              </span>
              <span className={styles.sharedRadioText}>
                <span>{option.label}</span>
                {option.description ? (
                  <span className={styles.sharedRadioDescription}>{option.description}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
