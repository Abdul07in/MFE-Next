'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent, type JSX } from 'react';

import { verifyClientPan } from '@platform/api/services';
import { Card } from '@shared-ui/components/Card';
import { DatePicker } from '@shared-ui/components/DatePicker';
import { Icon } from '@shared-ui/components/Icon';
import { Input } from '@shared-ui/components/Input';
import { Loader } from '@shared-ui/components/Loader';
import { Select } from '@shared-ui/components/Select';

import {
  ACCOUNT_TYPE_OPTIONS,
  BELONGS_TO_OPTIONS,
  DEFAULT_VERIFIED_PAN_HOLDER_NAME,
  RESIDENTIAL_STATUS_OPTIONS,
} from '../../constants';
import {
  clientEmailSchema,
  clientMobileSchema,
  clientPanSchema,
  formatPanInput,
} from '../../schemas/clientDetailsSchema';
import type {
  AccountTypeOption,
  ClientDetailsFormState,
  ResidentialStatusOption,
} from '../../types';
import type { ClientDetailsFormProps } from './ClientDetailsForm.types';
import styles from './ClientDetailsForm.module.scss';

function createInitialState(initialMobile: string): ClientDetailsFormState {
  return {
    mobile: initialMobile.replace(/\D/g, '').slice(0, 10),
    mobileBelongsTo: 'investor',
    email: '',
    emailBelongsTo: 'investor',
    pan: '',
    panStatus: 'idle',
    panHolderName: DEFAULT_VERIFIED_PAN_HOLDER_NAME,
    dob: '',
    accountType: '',
    residentialStatus: '',
  };
}

/**
 * Interactive Step 1 Client Details card for direct manual entry and PAN verification.
 * Proceeds straight to Email Address, Belongs To, and PAN Number after a valid 10-digit mobile is entered,
 * calls the centralized `verifyClientPan` API on 10-character PAN entry, and reveals Date of Birth,
 * Account Type, and Residential Status using shared MUI `DatePicker`, `Select`, and `Input` primitives.
 * @param props Initial mobile number and PAN lifecycle callbacks.
 * @returns Client details form card.
 */
export function ClientDetailsForm({
  initialMobile = '',
  onPanVerified,
  onPanCleared,
  onFormChange,
}: ClientDetailsFormProps): JSX.Element {
  const [form, setForm] = useState<ClientDetailsFormState>(() => createInitialState(initialMobile));
  const [manualUnlocked, setManualUnlocked] = useState(
    () => clientMobileSchema.safeParse(initialMobile.replace(/\D/g, '').slice(0, 10)).success,
  );

  useEffect(() => {
    onFormChange?.(form);
  }, [form, onFormChange]);

  const panVerifyMutation = useMutation({
    mutationFn: verifyClientPan,
    onSuccess: (result) => {
      setForm((prev) => {
        if (prev.pan !== result.pan) return prev;
        return {
          ...prev,
          panStatus: 'verified',
          panHolderName: result.holderName,
          accountType: prev.accountType || result.defaultAccountType,
          residentialStatus: prev.residentialStatus || result.defaultResidentialStatus,
        };
      });
      onPanVerified?.(result);
    },
    onError: () => {
      setForm((prev) => ({ ...prev, panStatus: 'error' }));
    },
  });

  const updateForm = (updater: (prev: ClientDetailsFormState) => ClientDetailsFormState): void => {
    setForm(updater);
  };

  const mobileValidation =
    form.mobile.length === 10 ? clientMobileSchema.safeParse(form.mobile) : null;
  const mobileError =
    mobileValidation && !mobileValidation.success
      ? mobileValidation.error.issues[0]?.message
      : undefined;

  const emailTrimmed = form.email.trim();
  const emailValidation =
    manualUnlocked && emailTrimmed.length > 0 ? clientEmailSchema.safeParse(emailTrimmed) : null;
  const emailError =
    emailValidation && !emailValidation.success
      ? emailValidation.error.issues[0]?.message
      : undefined;

  const isPanComplete = form.pan.length === 10;
  const panFormatError =
    isPanComplete && !clientPanSchema.safeParse(form.pan).success
      ? 'Enter a valid 10-character PAN (e.g. ABCDE1234F)'
      : undefined;
  const panApiError =
    form.panStatus === 'error' ? 'Unable to verify PAN right now. Please try again.' : undefined;
  const panError = panFormatError ?? panApiError;
  const isPanVerifying = panVerifyMutation.isPending && form.panStatus === 'verifying';
  const isPanVerified = form.panStatus === 'verified' && !panError;

  const todayIso = new Date().toISOString().slice(0, 10);

  const handleMobileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const sanitized = event.target.value.replace(/\D/g, '').slice(0, 10);
    if (sanitized.length === 10 && clientMobileSchema.safeParse(sanitized).success) {
      setManualUnlocked(true);
    }
    updateForm((prev) => ({ ...prev, mobile: sanitized }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    updateForm((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePanChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatPanInput(event.target.value);
    const isValidFormat = formatted.length === 10 && clientPanSchema.safeParse(formatted).success;

    updateForm((prev) => ({
      ...prev,
      pan: formatted,
      panStatus: isValidFormat ? 'verifying' : 'idle',
    }));

    if (isValidFormat) {
      panVerifyMutation.mutate(formatted);
    } else {
      onPanCleared?.();
    }
  };

  const renderBelongsToBar = (
    ariaLabel: string,
    value: string,
    onValueChange: (nextValue: string) => void,
  ): JSX.Element => (
    <div className={styles.clientDetailsBelongsBar}>
      <span className={styles.clientDetailsBelongsLabel} aria-hidden="true">
        Belongs To
      </span>
      <Select
        size="sm"
        aria-label={ariaLabel}
        value={value}
        options={BELONGS_TO_OPTIONS}
        onValueChange={onValueChange}
      />
    </div>
  );

  return (
    <Card variant="default" padding="lg" className={`${styles.clientDetailsCard} client-details-card`}>
      <h2 className={styles.clientDetailsHeading}>Client&nbsp;&nbsp;Details</h2>

      <div className={styles.clientDetailsContactGrid}>
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={form.mobile}
          onChange={handleMobileChange}
          placeholder="9876543210"
          state={mobileError ? 'error' : 'default'}
          errorText={mobileError}
          startAdornment={<span className={styles.clientDetailsPhonePrefix}>+91</span>}
          attachedFooter={
            manualUnlocked
              ? renderBelongsToBar('Mobile number belongs to', form.mobileBelongsTo, (nextValue) =>
                  updateForm((prev) => ({ ...prev, mobileBelongsTo: nextValue })),
                )
              : undefined
          }
        />

        {manualUnlocked ? (
          <Input
            label="Email Address"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleEmailChange}
            placeholder="Enter Email Address"
            state={emailError ? 'error' : 'default'}
            errorText={emailError}
            attachedFooter={renderBelongsToBar(
              'Email address belongs to',
              form.emailBelongsTo,
              (nextValue) => updateForm((prev) => ({ ...prev, emailBelongsTo: nextValue })),
            )}
          />
        ) : null}
      </div>

      {manualUnlocked ? (
        <>
          <div className={styles.clientDetailsDivider} aria-hidden="true" />

          <div
            className={`${styles.clientDetailsPanGrid} ${
              isPanVerified ? styles.clientDetailsPanGridExpanded : styles.clientDetailsPanGridSingle
            }`}
          >
            <div>
              <Input
                label="PAN NUMBER"
                value={form.pan}
                onChange={handlePanChange}
                placeholder="ABCDE1234F"
                maxLength={10}
                className={styles.clientDetailsPanInput}
                state={panError ? 'error' : isPanVerified ? 'success' : 'default'}
                errorText={panError}
                endAdornment={
                  isPanVerified ? (
                    <span className={styles.clientDetailsVerifiedBadge} aria-hidden="true">
                      <Icon name="check" size={11} />
                    </span>
                  ) : undefined
                }
              />
              {isPanVerifying ? (
                <div className={styles.clientDetailsVerifyingText}>
                  <Loader label="Verifying with Income Tax Dept…" />
                </div>
              ) : null}
              {isPanVerified ? (
                <p className={styles.clientDetailsVerifiedText}>
                  {form.panHolderName} · Verified
                </p>
              ) : null}
            </div>

            {isPanVerified ? (
              <>
                <DatePicker
                  label="DATE OF BIRTH"
                  disableFuture
                  maxDate={todayIso}
                  value={form.dob}
                  onValueChange={(nextDob) =>
                    updateForm((prev) => ({ ...prev, dob: nextDob }))
                  }
                />

                <Select
                  label="ACCOUNT TYPE"
                  placeholder="Select type"
                  value={form.accountType}
                  options={ACCOUNT_TYPE_OPTIONS}
                  onValueChange={(nextValue) =>
                    updateForm((prev) => ({
                      ...prev,
                      accountType: nextValue as AccountTypeOption,
                    }))
                  }
                />

                <Select
                  label="RESIDENTIAL STATUS"
                  placeholder="Select status"
                  value={form.residentialStatus}
                  options={RESIDENTIAL_STATUS_OPTIONS}
                  onValueChange={(nextValue) =>
                    updateForm((prev) => ({
                      ...prev,
                      residentialStatus: nextValue as ResidentialStatusOption,
                    }))
                  }
                />
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </Card>
  );
}
