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

export type ResidenceOtherOption = 'nri' | 'foreign' | 'pio' | '';

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

export interface JointHolderDetails {
  pan: string;
  dob: string;
  mobile: string;
  mobileBelongsTo: string;
  email: string;
  emailBelongsTo: string;
}

export interface OverseasAddressDetails {
  address: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface MinorDetailsState {
  minorName: string;
  relation: string;
  dobProofType: string;
  dobProofFileName: string;
  relProofType: string;
  relProofFileName: string;
}

export interface ResidenceOtherOptionCard {
  value: Exclude<ResidenceOtherOption, ''>;
  title: string;
  description: string;
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
  residenceOther: ResidenceOtherOption;
  overseasAddress: OverseasAddressDetails;
  minorDetails: MinorDetailsState;
  hasSecondary: boolean;
  secondaryHolder: JointHolderDetails;
  hasTertiary: boolean;
  tertiaryHolder: JointHolderDetails;
}

export type FatcaFormState = FatcaDetailsResponse;
