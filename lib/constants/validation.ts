export const VALIDATION = {
  passwordMinLength: 8,
  otpLength: 6,
  panRegex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
} as const;
