'use client';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import { useId, type JSX } from 'react';

import { Icon } from '../Icon';
import type { SelectProps } from './Select.types';
import styles from './Select.module.scss';

function SelectChevronIcon({
  size,
  className,
}: {
  size: 'md' | 'sm';
  className?: string;
}): JSX.Element {
  return (
    <span
      className={`${styles.sharedSelectChevron} ${
        size === 'sm' ? styles.sharedSelectChevronSm : ''
      } ${className ?? ''}`}
      aria-hidden="true"
    >
      <Icon name="chevron-down" size={size === 'sm' ? 12 : 16} />
    </span>
  );
}

/**
 * Standardized MUI Select dropdown styled to match the ICICI Pru Design System (`48px` height, `12px` radius).
 * Supports `md` (standard form field) and `sm` (compact inline bar) sizes with accessible labeling and helper/error states.
 * @param props Options array, selected value, change handlers, label, size, and validation state.
 * @returns Accessible MUI dropdown field.
 */
export function Select({
  id,
  name,
  options,
  value = '',
  onChange,
  onValueChange,
  label,
  placeholder = 'Select',
  state = 'default',
  size = 'md',
  helperText,
  errorText,
  fullWidth = true,
  disabled = false,
  'aria-label': ariaLabel,
  className,
}: SelectProps): JSX.Element {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = label ? `${selectId}-label` : undefined;
  const resolvedState = errorText ? 'error' : state;
  const message = resolvedState === 'error' ? errorText : helperText;
  const messageId = message ? `${selectId}-msg` : undefined;
  const isSmall = size === 'sm';

  const borderColor =
    resolvedState === 'error'
      ? 'var(--color-error)'
      : resolvedState === 'success'
        ? 'var(--color-success)'
        : 'var(--color-border)';

  const focusShadow =
    resolvedState === 'error'
      ? 'var(--shadow-focus-error)'
      : resolvedState === 'success'
        ? 'var(--shadow-focus-success)'
        : 'var(--shadow-focus-orange)';

  const handleChange = (event: SelectChangeEvent<string>): void => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const renderSelectedValue = (selected: string): JSX.Element | string => {
    if (!selected) {
      return <span className={styles.sharedSelectPlaceholder}>{placeholder}</span>;
    }
    const matched = options.find((option) => option.value === selected);
    return matched ? matched.label : selected;
  };

  return (
    <div
      className={`${styles.sharedSelectGroup} ${
        fullWidth ? styles.sharedSelectFullWidth : ''
      } shared-select ${className ?? ''}`}
    >
      {label ? (
        <label id={labelId} htmlFor={selectId} className={styles.sharedSelectLabel}>
          {label}
        </label>
      ) : null}

      <FormControl fullWidth={fullWidth} error={resolvedState === 'error'} disabled={disabled}>
        <MuiSelect<string>
          id={selectId}
          name={name}
          value={value}
          onChange={handleChange}
          displayEmpty
          renderValue={renderSelectedValue}
          IconComponent={() => <SelectChevronIcon size={size} />}
          inputProps={{
            'aria-label': label ? undefined : ariaLabel || placeholder,
            'aria-labelledby': labelId,
            'aria-describedby': messageId,
            'aria-invalid': resolvedState === 'error' || undefined,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 0.75,
                borderRadius: '14px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                maxHeight: 280,
                backgroundColor: 'var(--color-surface)',
              },
            },
            MenuListProps: {
              sx: {
                py: 0.75,
              },
            },
          }}
          sx={{
            height: isSmall ? '2.125rem' : 'var(--control-height-input)',
            borderRadius: isSmall ? '0 0 var(--radius-md) var(--radius-md)' : 'var(--radius-md)',
            backgroundColor: isSmall ? 'transparent' : 'var(--color-surface)',
            fontFamily: 'var(--font-sans)',
            fontSize: isSmall ? '0.75rem' : '0.9375rem',
            fontWeight: isSmall ? 700 : 600,
            color: 'var(--color-text)',
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              paddingBlock: 0,
              paddingLeft: isSmall ? '5.75rem' : '0.875rem',
              paddingRight: isSmall ? '2rem !important' : '2.5rem !important',
              minHeight: 'unset !important',
              height: '100%',
              boxSizing: 'border-box',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: isSmall ? '0 !important' : '1.5px !important',
              borderColor: `${borderColor} !important`,
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            },
            '&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: isSmall
                ? 'transparent !important'
                : resolvedState === 'default'
                  ? 'var(--color-text-muted) !important'
                  : `${borderColor} !important`,
            },
            '&.Mui-focused': {
              backgroundColor: isSmall ? 'transparent' : 'var(--color-bg)',
              boxShadow: isSmall ? 'none' : focusShadow,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isSmall
                  ? 'transparent !important'
                  : resolvedState === 'error'
                    ? 'var(--color-error) !important'
                    : 'var(--color-primary) !important',
              },
            },
            '&.Mui-disabled': {
              backgroundColor: isSmall ? 'transparent' : 'var(--color-surface-subtle)',
              color: 'var(--color-text-muted)',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: option.value === value ? 800 : 600,
                color: option.value === value ? 'var(--color-primary)' : 'var(--color-text)',
                backgroundColor:
                  option.value === value ? 'var(--color-primary-light)' : 'transparent',
                mx: 0.75,
                my: 0.25,
                borderRadius: '8px',
                minHeight: '2.375rem',
                '&:hover': {
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary-light)',
                  },
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>

      {message ? (
        <p
          id={messageId}
          className={
            resolvedState === 'error' ? styles.sharedSelectErrorMessage : styles.sharedSelectHelper
          }
          role={resolvedState === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
