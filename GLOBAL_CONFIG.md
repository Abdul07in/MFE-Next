# GLOBAL_CONFIG

Owner: Platform Engineering
Scope: Monorepo root configuration for investor and distributor apps

## 0) Monorepo package ownership

- Root `package.json`:
  - Owns workspace boundaries and cross-workspace orchestration scripts
  - Must not hold app-specific route logic
- `apps/investor/package.json`:
  - Owns investor runtime scripts and app dependencies
- `apps/distributor/package.json`:
  - Owns distributor runtime scripts and app dependencies

## 1) Next.js runtime configuration

- File: `next.config.ts`
- Purpose: Global security headers and shared framework defaults
- Defaults:
  - `reactStrictMode: true`
  - `poweredByHeader: false`
  - Security headers applied on all routes
- Environments: dev, test, staging, production

## 2) Environment variable policy

- Public variables: `NEXT_PUBLIC_*` only
- Server-only variables: all secrets, signing keys, private keys, and service credentials
- Required server variables:
  - `API_BASE_URL`
  - `API_TIMEOUT_MS`
  - `COOKIE_SESSION_NAME`
  - `COOKIE_CSRF_NAME`
  - `CRYPTO_KEY_ID`
  - `CRYPTO_ALGORITHM`
- Environments:
  - local: `.env.local`
  - non-local: environment injection by deployment platform

## 3) Axios transport defaults

- Location: `lib/api/axios.ts`
- Default `baseURL`: `process.env.API_BASE_URL`
- Default timeout: `Number(process.env.API_TIMEOUT_MS ?? 10000)`
- Retry policy: one replay on 401 after centralized refresh attempt
- Error normalization: typed `AppError` mapping in interceptors

## 4) React Query defaults

- Location: `lib/query/queryClient.ts`
- Query defaults:
  - `retry: 1`
  - `staleTime: 30000`
  - `gcTime: 300000`
  - `refetchOnWindowFocus: false`

## 5) Auth and token settings

- Storage: secure cookie-first strategy
- Cookie policy:
  - `HttpOnly`
  - `Secure` in HTTPS environments
  - `SameSite=Lax` minimum
- Session reset: forced sign-out on non-recoverable refresh failures

## 6) Encryption and decryption policy

- Server-only module boundary: `lib/security/*`
- Crypto operations are forbidden in browser bundles
- Key rotation support required through key-id selection (`CRYPTO_KEY_ID`)
- Transport interceptors may invoke crypto helpers only in server runtime paths

## 7) Global SCSS & typography bootstrap

- Global SCSS source: `styles/globals.scss`
- Import order:
  1. `styles/_reset.scss`
  2. `styles/_variables.scss` (ICICI Pru Design System color, spacing, radius, shadow, and layout tokens)
  3. `styles/_mixins.scss`
  4. base declarations in `styles/globals.scss`
- Primary typeface: `Mulish` (weights 300–900) loaded via `next/font/google` in `apps/investor/app/layout.tsx` and `apps/distributor/app/layout.tsx` and bound to `--font-mulish` / `--font-sans`.
- App MUI theme: `apps/investor/theme/theme.ts` and `apps/distributor/theme/theme.ts` consume the same design system palette and Mulish typography scale.

## 8) Error boundary baseline

- Route-level boundary files:
  - `apps/investor/app/error.tsx`
  - `apps/distributor/app/error.tsx`
- Purpose:
  - Show safe fallback UI for render/runtime route failures
  - Avoid exposing stack traces to end users
  - Provide a retry action through Next.js `reset()`
