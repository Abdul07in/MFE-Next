export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  requestId?: string;
}

export interface ApiErrorEnvelope {
  success: false;
  code: string;
  message: string;
  requestId?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresAt: string;
}

export interface PlatformPingResponse {
  status: 'ok';
  timestamp: string;
  source: 'server';
}

export interface PanVerifyRequest {
  pan: string;
}

export interface PanVerifyResponse {
  pan: string;
  verified: boolean;
  holderName: string;
  defaultAccountType: 'individual' | 'either_or_survivor' | 'proprietorship' | 'minor';
  defaultResidentialStatus: 'india' | 'usa' | 'other';
}

export interface FatcaTaxEntry {
  country: string;
  tin: string;
  noTin: boolean;
  noTinReason: string;
  otherReason: string;
}

export interface FatcaDetailsResponse {
  occupation: string;
  sourceOfIncome: string;
  incomeBracket: string;
  isPep: boolean | null;
  taxedAbroad: boolean | null;
  nationality: string;
  placeOfBirth: string;
  countryOfBirth: string;
  taxAddress: string;
  taxEntries: FatcaTaxEntry[];
  fatcaConsent: boolean;
}
