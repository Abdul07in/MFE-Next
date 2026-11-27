import type { RadioOption } from '@shared-ui/components/RadioGroup';
import type { SelectOption } from '@shared-ui/components/Select';

import type {
  ClientLookupChoiceOption,
  FolioStepDefinition,
  ResidenceOtherOptionCard,
} from './types';

export const FOLIO_WIZARD_STEPS: readonly FolioStepDefinition[] = [
  { stepNumber: 1, label: 'Client Details' },
  { stepNumber: 2, label: 'Bank Details & Mandate' },
  { stepNumber: 3, label: 'Review' },
];

export const FOLIO_IDENTIFICATION_COPY = {
  title: 'Instant customer identification',
  description:
    'We use mobile to fetch KYC-verified PAN, tax residency and FATCA declarations from CVL KRA — no re-keying required.',
  tipsHeading: 'Helpful Tips',
  tips: [
    'Only registered mobile numbers can be used.',
    'Prefilled fields marked with a sparkle are editable.',
    'Occupation is the only field the customer must confirm.',
  ],
} as const;

export const CLIENT_LOOKUP_CHOICES: readonly ClientLookupChoiceOption[] = [
  {
    mode: 'prefill',
    title: 'Prefill Customer Details',
    description:
      'Verify with an OTP and automatically fetch email, PAN, account type, residency and FATCA details. All fields stay editable.',
    recommended: true,
  },
  {
    mode: 'manual',
    title: 'Fill Details Manually',
    description: 'No OTP needed. All fields are left blank for you to enter yourself.',
  },
];

export const BELONGS_TO_OPTIONS: readonly SelectOption[] = [
  { value: 'investor', label: 'Investor (Self)' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'father', label: 'Father' },
  { value: 'mother', label: 'Mother' },
  { value: 'son', label: 'Son' },
  { value: 'daughter', label: 'Daughter' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'father_in_law', label: 'Father-in-law' },
  { value: 'mother_in_law', label: 'Mother-in-law' },
  { value: 'business_partner', label: 'Business Partner' },
  { value: 'other', label: 'Other' },
];

export const ACCOUNT_TYPE_OPTIONS: readonly SelectOption[] = [
  { value: 'individual', label: 'Individual' },
  { value: 'either_or_survivor', label: 'Either / Survivor' },
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'minor', label: 'Minor' },
];

export const RESIDENTIAL_STATUS_OPTIONS: readonly SelectOption[] = [
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'USA/Canada' },
  { value: 'other', label: 'Other' },
];

export const OCCUPATION_OPTIONS: readonly SelectOption[] = [
  { value: 'Salaried – Private Sector', label: 'Salaried – Private Sector' },
  { value: 'Salaried – Government', label: 'Salaried – Government' },
  { value: 'Self Employed – Business', label: 'Self Employed – Business' },
  { value: 'Self Employed – Professional', label: 'Self Employed – Professional' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Housewife / Homemaker', label: 'Housewife / Homemaker' },
  { value: 'Student', label: 'Student' },
  { value: 'Agriculturist', label: 'Agriculturist' },
  { value: 'Doctor', label: 'Doctor' },
  { value: 'Lawyer / Legal Professional', label: 'Lawyer / Legal Professional' },
  { value: 'CA / CS / CMA', label: 'CA / CS / CMA' },
  { value: 'Other', label: 'Other' },
];

export const INCOME_SOURCE_OPTIONS: readonly SelectOption[] = [
  { value: 'Salary / Wages', label: 'Salary / Wages' },
  { value: 'Business Income', label: 'Business Income' },
  { value: 'Professional Income', label: 'Professional Income' },
  { value: 'Rental Income', label: 'Rental Income' },
  { value: 'Investment Returns', label: 'Investment Returns' },
  { value: 'Agricultural Income', label: 'Agricultural Income' },
  { value: 'Pension', label: 'Pension' },
  { value: 'Inheritance / Gift', label: 'Inheritance / Gift' },
  { value: 'Other', label: 'Other' },
];

export const INCOME_BRACKET_OPTIONS: readonly SelectOption[] = [
  { value: 'Below ₹1 Lakh', label: 'Below ₹1 Lakh' },
  { value: '₹1 – 5 Lakhs', label: '₹1 – 5 Lakhs' },
  { value: '₹5 – 10 Lakhs', label: '₹5 – 10 Lakhs' },
  { value: '₹10 – 25 Lakhs', label: '₹10 – 25 Lakhs' },
  { value: '₹25 Lakhs – 1 Crore', label: '₹25 Lakhs – 1 Crore' },
  { value: 'Above ₹1 Crore', label: 'Above ₹1 Crore' },
];

export const COUNTRY_OPTIONS: readonly SelectOption[] = [
  { value: 'India', label: 'India' },
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'UAE', label: 'UAE' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Other', label: 'Other' },
];

export const NATIONALITY_OPTIONS: readonly SelectOption[] = [
  { value: 'Indian', label: 'Indian' },
  { value: 'American', label: 'American' },
  { value: 'British', label: 'British' },
  { value: 'Canadian', label: 'Canadian' },
  { value: 'Australian', label: 'Australian' },
  { value: 'Singaporean', label: 'Singaporean' },
  { value: 'Emirati', label: 'Emirati' },
  { value: 'Other', label: 'Other' },
];

export const NO_TIN_REASON_OPTIONS: readonly SelectOption[] = [
  {
    value:
      'The country where account holder is liable to pay tax does not issue tax identification number to its residents.',
    label:
      'The country where account holder is liable to pay tax does not issue tax identification number to its residents.',
  },
  { value: 'Tax identification type.', label: 'Tax identification type.' },
  { value: 'Others', label: 'Others' },
];

export const YES_NO_OPTIONS: readonly RadioOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export const TAGGED_MOBILE_NUMBERS: readonly string[] = ['9999999999', '8888888888'];

export const TAGGED_EMAIL_ADDRESSES: readonly string[] = [
  'duplicate@gmail.com',
  'taken@example.com',
];

export const DEFAULT_VERIFIED_PAN_HOLDER_NAME = 'RAHUL SHARMA';

export const RESIDENCE_OTHER_CARDS: readonly ResidenceOtherOptionCard[] = [
  {
    value: 'nri',
    title: 'Non Resident Indian',
    description: 'NRIs are Indian Citizens who are currently living abroad',
  },
  {
    value: 'foreign',
    title: 'Foreign National',
    description: 'Foreign Nationals are Citizens of countries other than India',
  },
  {
    value: 'pio',
    title: 'Person Of Indian Origin',
    description:
      'PIOs are Foreign Nationals who had earlier held an Indian passport or whose ancestors were Indian Nationals',
  },
];

export const OVERSEAS_COUNTRY_OPTIONS: readonly SelectOption[] = [
  'United States',
  'Canada',
  'United Kingdom',
  'United Arab Emirates',
  'Singapore',
  'Australia',
  'Saudi Arabia',
  'Qatar',
  'Germany',
  'Other',
].map((country) => ({ value: country, label: country }));

export const MINOR_RELATION_OPTIONS: readonly SelectOption[] = [
  'Father',
  'Mother',
  'Court Appointed Guardian',
].map((relation) => ({ value: relation, label: relation }));

export const MINOR_DOB_PROOF_OPTIONS: readonly SelectOption[] = [
  'Birth Certificate',
  'School Leaving Certificate',
  'Marks sheet issued by higher secondary board',
  'Passport of minor',
  'Others',
].map((proof) => ({ value: proof, label: proof }));

export const MINOR_REL_PROOF_OPTIONS: readonly SelectOption[] = [
  'Birth Certificate',
  'Court Order / Guardianship Certificate',
  'Aadhaar of minor',
  'School Leaving Certificate',
  'Others',
].map((proof) => ({ value: proof, label: proof }));

export const OFFLINE_KYC_OVD_DOCUMENTS: readonly string[] = [
  'Copy of PAN',
  'Copy of passport / Persons of Indian Origin (PIO) Card / Overseas Citizenship of India (OCI) Card',
  'Overseas address proof',
];

export const MINOR_PROOF_ALLOWED_EXTENSIONS = /\.(pdf|docx?|jpe?g|png)$/i;
export const MINOR_PROOF_MAX_BYTES = 5 * 1024 * 1024;
