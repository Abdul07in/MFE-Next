'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState, type JSX } from 'react';

import type { PanVerifyResponse } from '@platform/api/types';
import { distributorQueryOptions } from '@platform/query/queryOptions';
import { Button } from '@shared-ui/components/Button';
import { Icon } from '@shared-ui/components/Icon';

import {
  clientEmailSchema,
  clientMobileSchema,
  isJointHolderValid,
  isOverseasAddressComplete,
} from '../../schemas/clientDetailsSchema';
import type { ClientDetailsFormState, FatcaFormState } from '../../types';
import { ClientDetailsForm } from '../ClientDetailsForm';
import { FatcaDetailsCard } from '../FatcaDetailsCard';
import type { NewFolioClientFlowProps } from './NewFolioClientFlow.types';
import styles from './NewFolioClientFlow.module.scss';

const EMPTY_FATCA_STATE: FatcaFormState = {
  occupation: '',
  sourceOfIncome: '',
  incomeBracket: '',
  isPep: null,
  taxedAbroad: null,
  nationality: '',
  placeOfBirth: '',
  countryOfBirth: '',
  taxAddress: '',
  taxEntries: [
    {
      country: '',
      tin: '',
      noTin: false,
      noTinReason: '',
      otherReason: '',
    },
  ],
  fatcaConsent: false,
};

/**
 * Orchestrates Step 1 Client Details manual entry, mock PAN verification, React Query FATCA lookup,
 * and editable FATCA details before proceeding to Step 2.
 * @param props Optional initial mobile value.
 * @returns Client details and FATCA compliance workflow container.
 */
export function NewFolioClientFlow({ initialMobile = '' }: NewFolioClientFlowProps): JSX.Element {
  const [verifiedPan, setVerifiedPan] = useState('');
  const [clientValues, setClientValues] = useState<ClientDetailsFormState | null>(null);
  const [fatcaForm, setFatcaForm] = useState<FatcaFormState>(EMPTY_FATCA_STATE);
  const [proceedNotice, setProceedNotice] = useState('');

  const fatcaQuery = useQuery(distributorQueryOptions.fatca(verifiedPan));

  useEffect(() => {
    if (fatcaQuery.data) {
      setFatcaForm(fatcaQuery.data);
    }
  }, [fatcaQuery.data]);

  const handlePanVerified = useCallback((payload: PanVerifyResponse): void => {
    setVerifiedPan(payload.pan);
    setProceedNotice('');
  }, []);

  const handlePanCleared = useCallback((): void => {
    setVerifiedPan('');
    setFatcaForm(EMPTY_FATCA_STATE);
    setProceedNotice('');
  }, []);

  const handleFormChange = useCallback((nextValues: ClientDetailsFormState): void => {
    setClientValues(nextValues);
    setProceedNotice('');
  }, []);

  const isContactValid = Boolean(
    clientValues &&
      clientMobileSchema.safeParse(clientValues.mobile).success &&
      (!clientValues.email.trim() ||
        clientEmailSchema.safeParse(clientValues.email.trim()).success),
  );

  const isResidenceEligible = Boolean(
    clientValues &&
      (clientValues.residentialStatus === 'india' ||
        (clientValues.residentialStatus === 'other' &&
          clientValues.residenceOther === 'nri' &&
          isOverseasAddressComplete(clientValues.overseasAddress))),
  );

  const areJointHoldersValid = Boolean(
    clientValues &&
      (clientValues.accountType !== 'either_or_survivor' ||
        ((!clientValues.hasSecondary || isJointHolderValid(clientValues.secondaryHolder)) &&
          (!clientValues.hasTertiary || isJointHolderValid(clientValues.tertiaryHolder)))),
  );

  const canProceedToStep2 = Boolean(
    verifiedPan &&
      isContactValid &&
      clientValues?.dob &&
      clientValues?.accountType &&
      isResidenceEligible &&
      areJointHoldersValid &&
      fatcaForm.occupation &&
      fatcaForm.nationality &&
      fatcaForm.isPep !== true,
  );

  return (
    <div className={`${styles.newFolioFlow} new-folio-client-flow`}>
      <ClientDetailsForm
        initialMobile={initialMobile}
        onPanVerified={handlePanVerified}
        onPanCleared={handlePanCleared}
        onFormChange={handleFormChange}
      />

      {verifiedPan ? (
        <FatcaDetailsCard
          value={fatcaForm}
          onChange={(nextFatca) => {
            setFatcaForm(nextFatca);
            setProceedNotice('');
          }}
          isLoading={fatcaQuery.isPending}
          errorMessage={
            fatcaQuery.isError ? 'Unable to load FATCA details. Please retry.' : undefined
          }
          onRetry={() => {
            void fatcaQuery.refetch();
          }}
          residentialStatus={clientValues?.residentialStatus}
        />
      ) : null}

      {verifiedPan ? (
        <div className={styles.newFolioBottomActions}>
          <Button
            variant="primary"
            ctaShadow
            disabled={!canProceedToStep2}
            rightIcon={<Icon name="arrow-right" size={15} />}
            onClick={() =>
              setProceedNotice('Step 1 details verified and ready for Step 2 (Bank Details & Mandate).')
            }
          >
            Proceed
          </Button>
        </div>
      ) : null}

      {proceedNotice ? (
        <p className={styles.newFolioStepFeedback} role="status">
          {proceedNotice}
        </p>
      ) : null}
    </div>
  );
}
