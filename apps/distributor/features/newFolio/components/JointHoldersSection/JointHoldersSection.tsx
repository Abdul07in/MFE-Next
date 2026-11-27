'use client';

import type { JSX } from 'react';

import { DatePicker } from '@shared-ui/components/DatePicker';
import { Input } from '@shared-ui/components/Input';
import { Select } from '@shared-ui/components/Select';

import { BELONGS_TO_OPTIONS } from '../../constants';
import {
  clientEmailSchema,
  clientMobileSchema,
  clientPanSchema,
  formatPanInput,
} from '../../schemas/clientDetailsSchema';
import type { JointHolderDetails } from '../../types';
import type { JointHoldersSectionProps } from './JointHoldersSection.types';
import styles from './JointHoldersSection.module.scss';

interface HolderSlotConfig {
  key: 'secondary' | 'tertiary';
  title: 'Secondary' | 'Tertiary';
  enabled: boolean;
  holder: JointHolderDetails;
  onChange: (nextHolder: JointHolderDetails) => void;
  removable: boolean;
}

/**
 * Renders Secondary and optional Tertiary holder forms for `Either / Survivor` folios.
 * Reuses shared MUI `DatePicker`, MUI `Select`, and `Input` controls with per-holder PAN, mobile, and email validation.
 * @param props Active holder toggles, holder data, DOB constraint, and update handlers.
 * @returns Joint holder section cards and add buttons.
 */
export function JointHoldersSection({
  hasSecondary,
  hasTertiary,
  secondaryHolder,
  tertiaryHolder,
  maxDob,
  onToggleSecondary,
  onToggleTertiary,
  onSecondaryChange,
  onTertiaryChange,
}: JointHoldersSectionProps): JSX.Element {
  const holderSlots: readonly HolderSlotConfig[] = [
    {
      key: 'secondary',
      title: 'Secondary',
      enabled: hasSecondary,
      holder: secondaryHolder,
      onChange: onSecondaryChange,
      removable: false,
    },
    {
      key: 'tertiary',
      title: 'Tertiary',
      enabled: hasTertiary,
      holder: tertiaryHolder,
      onChange: onTertiaryChange,
      removable: true,
    },
  ];

  const renderBelongsBar = (
    ariaLabel: string,
    value: string,
    onValueChange: (nextValue: string) => void,
  ): JSX.Element => (
    <div className={styles.jointHolderBelongsBar}>
      <span className={styles.jointHolderBelongsLabel} aria-hidden="true">
        Belongs To
      </span>
      <Select
        size="sm"
        aria-label={ariaLabel}
        value={value}
        placeholder="Select"
        options={BELONGS_TO_OPTIONS}
        onValueChange={onValueChange}
      />
    </div>
  );

  return (
    <div className={styles.jointHoldersRoot}>
      {holderSlots.map(({ key, title, enabled, holder, onChange, removable }) => {
        if (!enabled) return null;

        const panError =
          holder.pan.length === 10 && !clientPanSchema.safeParse(holder.pan).success
            ? 'Enter a valid 10-character PAN (e.g. ABCDE1234F)'
            : undefined;

        const mobileCheck =
          holder.mobile.length === 10 ? clientMobileSchema.safeParse(holder.mobile) : null;
        const mobileError =
          mobileCheck && !mobileCheck.success ? mobileCheck.error.issues[0]?.message : undefined;

        const trimmedEmail = holder.email.trim();
        const emailCheck =
          trimmedEmail.length > 0 ? clientEmailSchema.safeParse(trimmedEmail) : null;
        const emailError =
          emailCheck && !emailCheck.success ? emailCheck.error.issues[0]?.message : undefined;

        return (
          <section
            key={key}
            aria-label={`${title} Holder`}
            className={styles.jointHolderCard}
          >
            <div className={styles.jointHolderHeader}>
              <h3 className={styles.jointHolderTitle}>{title} Holder</h3>
              {removable ? (
                <button
                  type="button"
                  className={styles.jointHolderRemoveButton}
                  onClick={() => onToggleTertiary(false)}
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className={styles.jointHolderGrid}>
              <Input
                label={`${title} Holder PAN`}
                value={holder.pan}
                maxLength={10}
                placeholder="ABCDE1234F"
                className={styles.jointHolderPanInput}
                state={panError ? 'error' : 'default'}
                errorText={panError}
                onChange={(event) =>
                  onChange({ ...holder, pan: formatPanInput(event.target.value) })
                }
              />

              <DatePicker
                label="Date of Birth"
                disableFuture
                maxDate={maxDob}
                value={holder.dob}
                onValueChange={(nextDob) => onChange({ ...holder, dob: nextDob })}
              />
            </div>

            <div className={styles.jointHolderGrid}>
              <Input
                label="Mobile Number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={holder.mobile}
                placeholder="9876543210"
                state={mobileError ? 'error' : 'default'}
                errorText={mobileError}
                startAdornment={<span className={styles.jointHolderPhonePrefix}>+91</span>}
                onChange={(event) =>
                  onChange({
                    ...holder,
                    mobile: event.target.value.replace(/\D/g, '').slice(0, 10),
                  })
                }
                attachedFooter={renderBelongsBar(
                  `${title} holder mobile belongs to`,
                  holder.mobileBelongsTo,
                  (mobileBelongsTo) => onChange({ ...holder, mobileBelongsTo }),
                )}
              />

              <Input
                label="Email Address"
                type="email"
                value={holder.email}
                placeholder="name@example.com"
                state={emailError ? 'error' : 'default'}
                errorText={emailError}
                onChange={(event) => onChange({ ...holder, email: event.target.value })}
                attachedFooter={renderBelongsBar(
                  `${title} holder email belongs to`,
                  holder.emailBelongsTo,
                  (emailBelongsTo) => onChange({ ...holder, emailBelongsTo }),
                )}
              />
            </div>
          </section>
        );
      })}

      {!hasSecondary || !hasTertiary ? (
        <div className={styles.jointHolderActions}>
          {!hasSecondary ? (
            <button
              type="button"
              className={styles.jointHolderAddButton}
              onClick={() => onToggleSecondary(true)}
            >
              + Add Secondary Holder
            </button>
          ) : null}
          {!hasTertiary ? (
            <button
              type="button"
              className={styles.jointHolderAddButton}
              onClick={() => onToggleTertiary(true)}
            >
              + Add Tertiary Holder
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
