import 'server-only';

/**
 * Ensures server-only crypto policy is respected by import boundaries.
 * @returns Active crypto key id from secure server env.
 */
export function getActiveCryptoKeyId(): string {
  return process.env.CRYPTO_KEY_ID ?? 'unset-key-id';
}
