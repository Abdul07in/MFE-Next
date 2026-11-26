import { z } from 'zod';

import { TAGGED_EMAIL_ADDRESSES, TAGGED_MOBILE_NUMBERS } from '../constants';

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
