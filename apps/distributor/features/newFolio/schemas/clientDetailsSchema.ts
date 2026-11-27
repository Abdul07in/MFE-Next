import { z } from 'zod';

import { TAGGED_EMAIL_ADDRESSES, TAGGED_MOBILE_NUMBERS } from '../constants';
import type { JointHolderDetails, OverseasAddressDetails } from '../types';

export const clientMobileSchema = z
  .string()
  .regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number')
  .refine(
    (value) => !TAGGED_MOBILE_NUMBERS.includes(value),
    'This mobile number is already tagged to another PAN',
  );

export const clientEmailSchema = z
  .string()
  .trim()
  .email('Enter a valid email address')
  .refine(
    (value) => !TAGGED_EMAIL_ADDRESSES.includes(value.toLowerCase()),
    'This email is already tagged to another PAN',
  );

export const clientPanSchema = z
  .string()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Enter a valid 10-character PAN (e.g. ABCDE1234F)');

/**
 * Enforces PAN positional format (`5 letters + 4 digits + 1 letter`) while typing.
 * @param raw Raw user input value.
 * @returns Uppercase sanitized PAN string up to 10 characters.
 */
export function formatPanInput(raw: string): string {
  let formatted = '';
  for (const ch of raw.toUpperCase()) {
    const idx = formatted.length;
    if (idx >= 10) break;
    const matchesPosition = idx < 5 || idx === 9 ? /[A-Z]/.test(ch) : /[0-9]/.test(ch);
    if (matchesPosition) {
      formatted += ch;
    }
  }
  return formatted;
}

/**
 * Checks whether all required overseas address fields are populated for NRI applicants.
 * @param address Overseas address field object.
 * @returns True when address, country, city, state, and pinCode are non-empty.
 */
export function isOverseasAddressComplete(address: OverseasAddressDetails): boolean {
  return Boolean(
    address.address.trim() &&
      address.country.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.pinCode.trim(),
  );
}

/**
 * Validates joint holder optional/active inputs so tagged contact numbers/emails or malformed PANs block progression.
 * @param holder Joint holder fields (`Secondary` or `Tertiary`).
 * @returns True when entered holder fields have no validation errors and minimum holder details are present.
 */
export function isJointHolderValid(holder: JointHolderDetails): boolean {
  if (!clientPanSchema.safeParse(holder.pan).success) return false;
  if (!holder.dob) return false;
  if (holder.mobile.length > 0 && !clientMobileSchema.safeParse(holder.mobile).success) {
    return false;
  }
  if (holder.email.trim().length > 0 && !clientEmailSchema.safeParse(holder.email.trim()).success) {
    return false;
  }
  return true;
}
