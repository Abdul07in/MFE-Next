'use client';

import Image from 'next/image';
import { useState, type JSX } from 'react';

import { IMAGE_URL } from '@shared/utils/imageURL';
import { Button } from '@shared-ui/components/Button';
import { Card } from '@shared-ui/components/Card';
import { Checkbox } from '@shared-ui/components/Checkbox';
import { Icon } from '@shared-ui/components/Icon';
import { Input } from '@shared-ui/components/Input';
import { Loader } from '@shared-ui/components/Loader';
import { Modal } from '@shared-ui/components/Modal';
import { RadioGroup } from '@shared-ui/components/RadioGroup';
import { Select } from '@shared-ui/components/Select';

import {
  COUNTRY_OPTIONS,
  INCOME_BRACKET_OPTIONS,
  INCOME_SOURCE_OPTIONS,
  NATIONALITY_OPTIONS,
  NO_TIN_REASON_OPTIONS,
  OCCUPATION_OPTIONS,
  YES_NO_OPTIONS,
} from '../../constants';
import type { FatcaDetailsCardProps } from './FatcaDetailsCard.types';
import styles from './FatcaDetailsCard.module.scss';

function formatYesNo(value: boolean | null): string {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return '—';
}

/**
 * Displays KYC-fetched FATCA Details in a compact summary card with inline Edit/Done toggling.
 * Reuses shared `Card`, `Select`, `Input`, `RadioGroup`, `Checkbox`, `Button`, `Loader`, and `Modal`.
 * @param props FATCA state, change handler, loading/error state, and residential status.
 * @returns FATCA summary or edit form card.
 */
export function FatcaDetailsCard({
  value,
  onChange,
  isLoading = false,
  errorMessage,
  onRetry,
  residentialStatus,
}: FatcaDetailsCardProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [showPersonal, setShowPersonal] = useState(false);
  const [pepModalOpen, setPepModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Card variant="default" padding="none" className={`${styles.fatcaCard} fatca-details-card`}>
        <div className={styles.fatcaLoadingState}>
          <Loader label="Fetching FATCA details from KYC…" />
        </div>
      </Card>
    );
  }

  if (errorMessage) {
    return (
      <Card variant="default" padding="none" className={`${styles.fatcaCard} fatca-details-card`}>
        <div className={styles.fatcaLoadingState}>
          <p className={styles.fatcaErrorText} role="alert">
            {errorMessage}
          </p>
          {onRetry ? (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </div>
      </Card>
    );
  }

  const primaryTaxEntry = value.taxEntries[0] ?? {
    country: '',
    tin: '',
    noTin: false,
    noTinReason: '',
    otherReason: '',
  };

  const updatePrimaryTaxEntry = (patch: Partial<typeof primaryTaxEntry>): void => {
    const nextEntry = { ...primaryTaxEntry, ...patch };
    onChange({
      ...value,
      taxEntries: [nextEntry, ...value.taxEntries.slice(1)],
    });
  };

  const canSaveEdits = Boolean(value.occupation && value.nationality);
  const requiresFatcaConsent = residentialStatus === 'usa';

  const summaryItems: readonly [string, string][] = [
    ['Occupation', value.occupation],
    ['Source of Income', value.sourceOfIncome],
    ['Annual Income', value.incomeBracket],
    ['PEP', formatYesNo(value.isPep)],
    ['Taxed Abroad', formatYesNo(value.taxedAbroad)],
    ['Nationality', value.nationality],
    ['Place of Birth', value.placeOfBirth],
    ['Country of Birth', value.countryOfBirth],
  ];

  return (
    <>
      <Modal
        open={pepModalOpen}
        onClose={() => setPepModalOpen(false)}
        title="Politically Exposed Person"
        description="The applicant is identified as a Politically Exposed Person (PEP). Please visit the nearest branch office for further verification."
        actions={
          <Button variant="primary" onClick={() => setPepModalOpen(false)}>
            Okay
          </Button>
        }
      />

      <Card variant="default" padding="none" className={`${styles.fatcaCard} fatca-details-card`}>
        <div className={styles.fatcaCardHeader}>
          <div className={styles.fatcaCardTitleWrap}>
            <span className={styles.fatcaCardShieldBadge} aria-hidden="true">
              <Image
                src={IMAGE_URL.FATCA_SHIELD_ICON}
                alt=""
                width={15}
                height={16}
                unoptimized
              />
            </span>
            <div>
              <h3 className={styles.fatcaCardTitle}>FATCA Details</h3>
              <p className={styles.fatcaCardSubtitle}>
                {isEditing
                  ? 'Regulatory, tax compliance & personal information per SEBI KRA and FATCA/CRS guidelines'
                  : 'Regulatory & tax compliance · Auto-filled from KYC'}
              </p>
            </div>
          </div>

          {isEditing ? (
            <Button
              variant="primary"
              size="sm"
              disabled={!canSaveEdits}
              onClick={() => setIsEditing(false)}
            >
              Done
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Icon name="edit" size={12} />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        {!isEditing ? (
          <div className={styles.fatcaSummaryBody}>
            <div className={styles.fatcaSummaryGrid}>
              {summaryItems.map(([label, itemValue]) => (
                <div key={label} className={styles.fatcaSummaryItem}>
                  <div className={styles.fatcaSummaryItemLabel}>{label}</div>
                  <div className={styles.fatcaSummaryItemValue}>{itemValue || '—'}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.fatcaEditBody}>
            <Select
              label="Occupation"
              placeholder="Select occupation"
              value={value.occupation}
              options={OCCUPATION_OPTIONS}
              onValueChange={(occupation) =>
                onChange({
                  ...value,
                  occupation,
                  sourceOfIncome: value.sourceOfIncome || 'Salary / Wages',
                  incomeBracket: value.incomeBracket || '₹5 – 10 Lakhs',
                })
              }
            />

            <div className={styles.fatcaEditGridTwo}>
              <Select
                label="Source of Income"
                placeholder="Select source"
                value={value.sourceOfIncome}
                options={INCOME_SOURCE_OPTIONS}
                onValueChange={(sourceOfIncome) => onChange({ ...value, sourceOfIncome })}
              />

              <Select
                label="Annual Income"
                placeholder="Select income bracket"
                value={value.incomeBracket}
                options={INCOME_BRACKET_OPTIONS}
                onValueChange={(incomeBracket) => onChange({ ...value, incomeBracket })}
              />
            </div>

            <div className={styles.fatcaEditGridTwo}>
              <div>
                <RadioGroup
                  name="fatca-pep"
                  label="Politically Exposed Person"
                  orientation="horizontal"
                  options={YES_NO_OPTIONS}
                  value={value.isPep === true ? 'yes' : value.isPep === false ? 'no' : undefined}
                  onChange={(selected) => {
                    const isPep = selected === 'yes';
                    onChange({ ...value, isPep });
                    if (isPep) setPepModalOpen(true);
                  }}
                />
                <p className={styles.fatcaFieldHint}>
                  Includes family members of senior public officials
                </p>
              </div>

              <div>
                <RadioGroup
                  name="fatca-taxed-abroad"
                  label="Taxed Outside India"
                  orientation="horizontal"
                  options={YES_NO_OPTIONS}
                  value={
                    value.taxedAbroad === true
                      ? 'yes'
                      : value.taxedAbroad === false
                        ? 'no'
                        : undefined
                  }
                  onChange={(selected) =>
                    onChange({ ...value, taxedAbroad: selected === 'yes' })
                  }
                />
                <p className={styles.fatcaFieldHint}>Required for FATCA/CRS compliance</p>
              </div>
            </div>

            {value.taxedAbroad === true ? (
              <div className={styles.fatcaTaxPanel}>
                <h4 className={styles.fatcaTaxPanelHeading}>Tax Residency Details</h4>
                <div className={styles.fatcaEditGridTwo}>
                  <Select
                    label="Tax Country 1"
                    placeholder="Select country"
                    value={primaryTaxEntry.country}
                    options={COUNTRY_OPTIONS}
                    onValueChange={(country) => updatePrimaryTaxEntry({ country })}
                  />

                  <Input
                    label="Tax ID (TIN) 1"
                    value={primaryTaxEntry.noTin ? '' : primaryTaxEntry.tin}
                    disabled={primaryTaxEntry.noTin}
                    placeholder="Enter TIN"
                    onChange={(event) => updatePrimaryTaxEntry({ tin: event.target.value })}
                  />
                </div>

                <Input
                  label="Tax Residency Address"
                  value={value.taxAddress}
                  placeholder="Enter overseas tax residency address"
                  onChange={(event) => onChange({ ...value, taxAddress: event.target.value })}
                />

                <Checkbox
                  label="I don't have TIN"
                  checked={primaryTaxEntry.noTin}
                  onChange={(event) =>
                    updatePrimaryTaxEntry(
                      event.target.checked
                        ? { noTin: true }
                        : { noTin: false, noTinReason: '', otherReason: '' },
                    )
                  }
                />

                {primaryTaxEntry.noTin ? (
                  <div className={styles.fatcaEditGridTwo}>
                    <Select
                      label="Reason for no TIN"
                      placeholder="Select reason"
                      value={primaryTaxEntry.noTinReason}
                      options={NO_TIN_REASON_OPTIONS}
                      onValueChange={(noTinReason) =>
                        updatePrimaryTaxEntry({
                          noTinReason,
                          otherReason: noTinReason === 'Others' ? primaryTaxEntry.otherReason : '',
                        })
                      }
                    />
                    {primaryTaxEntry.noTinReason === 'Others' ? (
                      <Input
                        label="Add Reason for No Tax"
                        value={primaryTaxEntry.otherReason}
                        placeholder="Specify reason"
                        onChange={(event) =>
                          updatePrimaryTaxEntry({ otherReason: event.target.value })
                        }
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {requiresFatcaConsent ? (
              <div className={styles.fatcaConsentBox}>
                <h4 className={styles.fatcaConsentHeading}>FATCA Declaration</h4>
                <Checkbox
                  label="I declare that I am a US / Canada tax resident and consent to reporting of my account information under FATCA/CRS provisions of the Income Tax Act, 1961."
                  checked={value.fatcaConsent}
                  onChange={(event) => onChange({ ...value, fatcaConsent: event.target.checked })}
                />
              </div>
            ) : null}

            <div className={styles.fatcaDivider} aria-hidden="true" />

            <button
              type="button"
              className={styles.fatcaPersonalToggle}
              aria-expanded={showPersonal}
              onClick={() => setShowPersonal((prev) => !prev)}
            >
              <span className={styles.fatcaPersonalLabel}>Personal Information</span>
              <span className={styles.fatcaPersonalAction}>
                <span>{showPersonal ? 'View less' : 'View more'}</span>
                <span className={showPersonal ? styles.fatcaPersonalChevronOpen : undefined}>
                  <Icon name="chevron-down" size={12} />
                </span>
              </span>
            </button>

            {showPersonal ? (
              <div className={styles.fatcaEditGridThree}>
                <Input
                  label="Place of Birth *"
                  value={value.placeOfBirth}
                  placeholder="Enter city"
                  onChange={(event) => onChange({ ...value, placeOfBirth: event.target.value })}
                />

                <Select
                  label="Country of Birth *"
                  placeholder="Select country"
                  value={value.countryOfBirth}
                  options={COUNTRY_OPTIONS}
                  onValueChange={(countryOfBirth) => onChange({ ...value, countryOfBirth })}
                />

                <Select
                  label="Nationality *"
                  placeholder="Select nationality"
                  value={value.nationality}
                  options={NATIONALITY_OPTIONS}
                  onValueChange={(nationality) => onChange({ ...value, nationality })}
                />
              </div>
            ) : null}
          </div>
        )}
      </Card>
    </>
  );
}
