import type { FatcaDetailsResponse } from '@platform/api/types';

export type FolioWizardStep = 1 | 2 | 3;

export type ClientLookupMode = 'prefill' | 'manual';

export type ClientDetailsPhase = 'contact' | 'manual';

export type PanVerificationStatus = 'idle' | 'verifying' | 'verified' | 'error';

export type AccountTypeOption =
  | 'individual'
  | 'either_or_survivor'
  | 'proprietorship'
  | 'minor'
  | '';

export type ResidentialStatusOption = 'india' | 'usa' | 'other' | '';

export interface FolioStepDefinition {
  stepNumber: FolioWizardStep;
  label: string;
}

export interface ClientLookupChoiceOption {
  mode: ClientLookupMode;
  title: string;
  description: string;
  recommended?: boolean;
}

export interface ClientDetailsFormState {
  mobile: string;
  mobileBelongsTo: string;
  email: string;
  emailBelongsTo: string;
  pan: string;
  panStatus: PanVerificationStatus;
  panHolderName: string;
  dob: string;
  accountType: AccountTypeOption;
  residentialStatus: ResidentialStatusOption;
}

export type FatcaFormState = FatcaDetailsResponse;
