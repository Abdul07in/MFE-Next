'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers/models';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useId, useState, type JSX } from 'react';

import type { DatePickerProps } from './DatePicker.types';
import styles from './DatePicker.module.scss';

const ISO_DATE_FORMAT = 'YYYY-MM-DD';

function parseIsoDate(value?: string): Dayjs | null {
  if (!value) return null;
  const parsed = dayjs(value, ISO_DATE_FORMAT, true);
  return parsed.isValid() ? parsed : dayjs(value).isValid() ? dayjs(value) : null;
}

/**
 * Standardized MUI X DatePicker styled to match the ICICI Pru Design System (`48px` height, `12px` radius).
 * Accepts and emits ISO `YYYY-MM-DD` date strings while rendering localized `DD/MM/YYYY` input and calendar selection.
 * @param props Date value, change handler, label, date bounds, and validation state.
 * @returns Accessible MUI date picker field.
 */
export function DatePicker({
  id,
  name,
  value = '',
  onValueChange,
  label,
  format = 'DD/MM/YYYY',
  state = 'default',
  helperText,
  errorText,
  minDate,
  maxDate,
  disableFuture = false,
  disablePast = false,
  fullWidth = true,
  disabled = false,
  readOnly = false,
  'aria-label': ariaLabel,
  className,
}: DatePickerProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = label ? `${inputId}-label` : undefined;

  const [draftDate, setDraftDate] = useState<Dayjs | null>(() => parseIsoDate(value));
  const [internalError, setInternalError] = useState<DateValidationError>(null);

  useEffect(() => {
    setDraftDate((prev) => {
      const prevIso = prev && prev.isValid() ? prev.format(ISO_DATE_FORMAT) : '';
      if (prevIso === value) return prev;
      return parseIsoDate(value);
    });
  }, [value]);

  const validationErrorMessage =
    internalError === 'disableFuture' || internalError === 'maxDate'
      ? 'Date cannot be in the future'
      : internalError === 'minDate' || internalError === 'disablePast'
        ? 'Selected date is outside the allowed range'
        : internalError === 'invalidDate'
          ? 'Enter a valid date'
          : undefined;

  const resolvedErrorText = errorText ?? validationErrorMessage;
  const resolvedState = resolvedErrorText ? 'error' : state;
  const message = resolvedState === 'error' ? resolvedErrorText : helperText;
  const messageId = message ? `${inputId}-msg` : undefined;

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

  const handlePickerChange = (
    nextValue: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ): void => {
    setDraftDate(nextValue);

    if (nextValue === null) {
      setInternalError(null);
      onValueChange?.('');
      return;
    }

    if (nextValue.isValid() && !context.validationError) {
      setInternalError(null);
      onValueChange?.(nextValue.format(ISO_DATE_FORMAT));
    } else if (context.validationError) {
      onValueChange?.('');
    }
  };

  return (
    <div
      className={`${styles.sharedDatePickerGroup} ${
        fullWidth ? styles.sharedDatePickerFullWidth : ''
      } shared-date-picker ${className ?? ''}`}
    >
      {label ? (
        <label id={labelId} htmlFor={inputId} className={styles.sharedDatePickerLabel}>
          {label}
        </label>
      ) : null}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          value={draftDate}
          onChange={handlePickerChange}
          onError={(err) => setInternalError(err)}
          format={format}
          minDate={parseIsoDate(minDate) ?? undefined}
          maxDate={parseIsoDate(maxDate) ?? undefined}
          disableFuture={disableFuture}
          disablePast={disablePast}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          slotProps={{
            textField: {
              id: inputId,
              fullWidth,
              error: resolvedState === 'error',
              inputProps: {
                'aria-label': label ? undefined : ariaLabel || 'Select date',
                'aria-labelledby': labelId,
                'aria-describedby': messageId,
                'aria-invalid': resolvedState === 'error' || undefined,
              },
              sx: {
                width: fullWidth ? '100%' : 'auto',
                '& .MuiPickersOutlinedInput-root': {
                  height: 'var(--control-height-input)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  paddingRight: '0.5rem',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  '&.Mui-focused': {
                    backgroundColor: 'var(--color-bg)',
                    boxShadow: focusShadow,
                    '& .MuiPickersOutlinedInput-notchedOutline': {
                      borderColor:
                        resolvedState === 'error'
                          ? 'var(--color-error) !important'
                          : 'var(--color-primary) !important',
                    },
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'var(--color-surface-subtle)',
                    color: 'var(--color-text-muted)',
                  },
                  '&:hover:not(.Mui-disabled):not(.Mui-focused) .MuiPickersOutlinedInput-notchedOutline':
                    {
                      borderColor:
                        resolvedState === 'default'
                          ? 'var(--color-text-muted) !important'
                          : `${borderColor} !important`,
                    },
                },
                '& .MuiPickersOutlinedInput-notchedOutline': {
                  borderWidth: '1.5px !important',
                  borderColor: `${borderColor} !important`,
                },
                '& .MuiPickersInputBase-sectionsContainer': {
                  paddingBlock: 0,
                  paddingLeft: '0.125rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                },
                '& .MuiPickersSectionList-sectionContent': {
                  fontFamily: 'var(--font-sans)',
                },
                '& .MuiInputAdornment-root .MuiIconButton-root': {
                  color: 'var(--color-text-60)',
                  borderRadius: 'var(--radius-sm)',
                  '&:hover': {
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                  },
                },
              },
            },
            openPickerButton: {
              'aria-label': label ? `Choose ${label}` : 'Choose date',
            },
            desktopPaper: {
              sx: {
                mt: 0.75,
                borderRadius: '14px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: 'var(--color-surface)',
                fontFamily: 'var(--font-sans)',
              },
            },
            mobilePaper: {
              sx: {
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: 'var(--color-surface)',
                fontFamily: 'var(--font-sans)',
              },
            },
          }}
        />
      </LocalizationProvider>

      {message ? (
        <p
          id={messageId}
          className={
            resolvedState === 'error'
              ? styles.sharedDatePickerErrorMessage
              : styles.sharedDatePickerHelper
          }
          role={resolvedState === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
