# CODING STANDARDS - ICICI Mutual Fund Web Platform

Version: 1.0
Applies to: This repository only
Audience: Engineering teams building investor and distributor experiences for ICICI Prudential Mutual Fund

> Standards for **this** Next.js App Router monorepo (`apps/investor`, `apps/distributor`, `packages/shared`).
> V1 (`CODING_STANDARDS V1.md`) describes the legacy Vite/CRA `frontend-react` app (atoms, SCSS, Redux). **Do not apply V1 literally here.** Reuse only the ideas that still hold: typed APIs, central endpoints, crypto in the transport layer, a11y, and no secrets in the browser.
>
> Audience: Indian retail MF investors **and** distributor partners on regulated AMC hosts.
> Compliance bar: **WCAG 2.2 AA** (SEBI digital accessibility) · strong Core Web Vitals · crawlable + answer-engine friendly HTML · **server-only cryptography**.

---

## 0. How to use this document

| Role | What to do |
| --- | --- |
| Engineers | Follow these standards when creating or editing code under `apps/investor`, `apps/distributor`, and `packages/*`. |
| AI agents | Read this document before generating or modifying code. Treat these rules as default unless a stricter repo rule applies. |
| Reviewers | Block PRs that violate non-negotiables (security, secrets handling, accessibility baseline, metadata requirements, or architecture boundaries). |

Usage rules:

- Apply this as the source of truth for new work in this repository.
- If this document and legacy V1 guidance differ, this document wins.
- For exceptions, document the reason in PR description and get architecture approval.

---

## 1. Purpose and scope

This document defines engineering standards for a greenfield, production-grade web platform using:

- Next.js (latest stable, App Router)
- React (latest stable)
- TypeScript (strict mode)
- TanStack Query / React Query (latest stable)
- Axios (latest stable)
- MUI (latest stable)

Primary goals:

- Secure-by-default financial application behavior
- Fast, reliable UX on India mobile networks
- Accessible and compliant UI (WCAG 2.2 AA target)
- Scalable code organization for long-term maintainability

---

## 2. Technology baseline

Use these baseline choices unless architecture review approves exceptions:

- Framework: Next.js App Router
- Runtime split:
  - Server Components by default
  - Client Components only where browser interactivity is required
- Language: TypeScript with `strict: true`, `noUncheckedIndexedAccess: true`
- Data fetching:
  - Server data: Next.js server-side fetch/loaders
  - Client data and mutations: React Query
- HTTP client:
  - Axios instance with centralized interceptors and typed response models
- UI system:
  - MUI components
  - Emotion runtime with consistent token usage
  - Global SCSS foundation loaded once at platform level

---

## 3. Recommended folder architecture

Use feature-first modules inside app boundaries.

```text
repo-root/
  lib/
    api/
      axios.ts
      endpoints.ts
      errors.ts
      interceptors.ts
      services.ts
      types.ts
    query/
      queryClient.ts
      queryKeys.ts
      queryOptions.ts
    seo/
    security/
    utils/
    constants/
      app.ts
      routes.ts
      validation.ts
  styles/
    globals.scss
    _variables.scss
    _mixins.scss
    _reset.scss
  middleware.ts
  next.config.ts
  apps/
    investor/
      app/
        (public)/
        (authenticated)/
        api/
        layout.tsx
        page.tsx
      components/
        ui/
        layout/
      features/
        funds/
          components/
          schemas/
          types/
          index.ts
        auth/
        portfolio/
    distributor/
      app/
        (public)/
        (authenticated)/
        api/
        layout.tsx
        page.tsx
      components/
        ui/
        layout/
      features/
        leads/
          components/
          schemas/
          types/
          index.ts
        auth/
        reports/
  packages/
    shared/
      constants/
      types/
      utils/
      validation/
      services/
      hooks/
      icons/
    shared-ui/
      src/
        components/
          Button/
            Button.tsx
            Button.types.ts
            Button.module.scss
            Button.docs.md
            index.ts
          EmptyState/
          Loader/
        index.ts
```

### 3.1 Exact structure parity rule

- `apps/investor` and `apps/distributor` must use the same top-level structure: `app`, `components`, `features`.
- Folder names, conventions, and file responsibilities must match across both apps.
- If a new platform-level folder is added to one app, add the equivalent in the other app unless there is a documented exception.

### 3.1.1 Global platform ownership rule

- The following are global platform modules and must exist at monorepo root level, not duplicated per app:
  - `lib/*`
  - `styles/*`
  - `middleware.ts`
  - `next.config.ts`
- Investor and distributor apps must consume these shared modules.
- App-specific overrides are allowed only when documented and approved.

### 3.2 Shared reusable components rule

- Reusable, cross-app components must live in `packages/shared-ui`.
- App-specific components must stay in each app's `components` or `features` folder.
- `packages/shared-ui` must not import app-local modules from investor or distributor.

### 3.3 Constants management rule

- Constants must be centralized and scoped by responsibility:
  - `packages/shared/constants`: values shared across investor and distributor.
  - `lib/constants`: platform-level constants used by both apps.
  - `features/*/constants.ts`: feature-local constants only.
- Never hardcode repeated values in components (labels, route paths, limits, timers, regex, storage keys).
- Route strings must come from constants, not inline string literals.

### 3.4 Services organization rule

- Service layer location:
  - Shared domain services: `packages/shared/services`.
  - Platform transport services: `lib/api/services.ts`.
- UI components and hooks must call service methods, not raw Axios.
- Services must return typed models and hide transport implementation details.

### 3.4.2 Central API location rule (mandatory)

- API code must live only in centralized locations:
  - `lib/api/*`
  - `packages/shared/services/*` (shared service contracts/helpers)
- API calls are not allowed in:
  - `components/*`
  - `features/*/components/*`
  - `features/*/hooks/*`
- Do not create feature-level API folders such as `features/<feature>/api`.
- Feature modules consume centralized services via typed functions.

### 3.4.1 Hooks placement rule (common place)

- All reusable hooks must be placed in `packages/shared/hooks`.
- Do not place reusable hooks under app feature folders.
- App-local adapter hooks are allowed only in `apps/*/lib/query` when they are tightly coupled to app bootstrap/runtime concerns.
- Hook naming convention: `useXxx` and one file per hook (`useFundDetail.ts`).
- Shared hooks must be framework-safe, typed, and documented with TSDoc.

### 3.5 Endpoints registry rule

- Every API path must be defined in one centralized file at `lib/api/endpoints.ts`.
- Shared endpoint fragments can be kept in `packages/shared/constants/endpoints.ts`.
- Endpoint paths are not allowed inside components, hooks, or mutation/query definitions.
- Endpoint paths are not allowed in feature folders.

Example endpoint registry:

```ts
export const ENDPOINTS = {
  auth: {
    login: '/v1/auth/login',
    refresh: '/v1/auth/refresh',
  },
  funds: {
    list: '/v1/funds',
    detail: (fundCode: string) => `/v1/funds/${fundCode}`,
  },
} as const;
```

### 3.6 Component file contract (mandatory)

Each component folder must contain the following files:

- `ComponentName.tsx` (component implementation)
- `ComponentName.types.ts` (props and related types)
- `ComponentName.module.scss` (component-level styles)
- `index.ts` (exports)

Optional files:

- `ComponentName.docs.md` (recommended for shared/reusable components)

Rules:

- Do not mix multiple component implementations in one file.
- Keep component styles in the component's own `*.module.scss` file.
- Do not import component `*.module.scss` files globally.

Example:

```text
components/
  FundCard/
    FundCard.tsx
    FundCard.types.ts
    FundCard.module.scss
    index.ts
```

### 3.7 SCSS global-level strategy

- SCSS foundation must be maintained at platform global level in `styles/*`.
- `globals.scss` must be imported once in the platform root layout path shared by both apps.
- Global files may include:
  - reset/normalize
  - typography foundations
  - CSS variables and utility classes
  - common mixins and shared SCSS functions
- SCSS variables and mixins should be declared in partials (`_variables.scss`, `_mixins.scss`) and consumed by component module SCSS files.
- Avoid page-level duplicated style constants when they can be defined once in global SCSS.

### 3.8 Global configuration documentation (mandatory)

Global-level configuration must be documented in a dedicated root file:

- `GLOBAL_CONFIG.md`

Each document must include owner, purpose, default values, and environments for:

- `next.config.*` and runtime flags
- environment variables (`NEXT_PUBLIC_*`, server-only vars)
- Axios transport defaults (base URL, timeout, retry policy)
- React Query global defaults (`QueryClient`)
- auth/token settings (cookie names, expiry strategy)
- encryption/decryption policy references
- global SCSS import order

Change rule:

- Any PR changing global config behavior must update `GLOBAL_CONFIG.md` in the same PR.

### Layering rules

- `app/*` composes route-level server pages and metadata.
- `features/*` owns business logic per domain.
- `components/ui/*` contains reusable presentational primitives.
- `lib/api/*` (root-level) owns Axios and transport concerns only.
- `packages/shared/*` can hold types, schemas, pure helpers; no app-specific UI.
- `packages/shared/hooks/*` is the canonical location for reusable hooks.

### Dependency direction

- `app` -> `features` -> `lib`
- `components` -> `lib` (public, non-sensitive only)
- Never import route files across features.
- Never import server-only modules inside client components.

---

## 4. TypeScript standards

- Do not use `any` in new code.
- Prefer `unknown` and narrow with guards.
- Use `interface` for object contracts and `type` for unions/mapped types.
- Use `import type` for type-only imports.
- API shapes must be typed end-to-end.
- Validate external payloads using runtime schemas (for example Zod) before use.

Naming:

- Components: PascalCase (`FundCard.tsx`)
- Hooks: camelCase with `use` prefix (`useFundNav.ts`)
- Types: PascalCase suffixes (`FundNavResponse`, `CreateSIPPayload`)
- Constants: UPPER_SNAKE_CASE

### 4.1 Documentation standards (mandatory)

- Component-level documentation is required for all exported components.
- Function-level documentation is required for all exported functions and all non-trivial private functions.
- Use TSDoc/JSDoc with, at minimum:
  - purpose summary
  - parameters
  - return value
  - thrown errors (if any)
  - security-sensitive notes (if any)

Example:

```ts
/**
 * Fetches fund detail for a scheme code and normalizes API response.
 * @param fundCode Scheme code used by upstream MF API.
 * @returns Normalized fund detail model for UI consumption.
 * @throws AppError when transport or schema validation fails.
 */
export async function getFundDetail(fundCode: string): Promise<FundDetailResponse> {
  // implementation
}
```

- In addition to inline doc comments, each reusable shared component in `packages/shared-ui` should include a short `*.docs.md` describing:
  - intended usage
  - required props
  - accessibility notes
  - example usage

---

## 5. Next.js and React architecture guidelines

### 5.1 Server-first rendering

- Default every route to a Server Component.
- Keep `'use client'` only on leaf nodes that require:
  - stateful UI interactions
  - browser APIs
  - React Query hooks
- Do not convert whole pages to client components for minor interactivity.

### 5.2 Route metadata and SEO

- Every indexable route must define metadata using centralized helpers.
- Canonical URL and Open Graph tags are required for public pages.
- Exactly one visible H1 per page.
- Primary page meaning must be present in server-rendered HTML.

### 5.3 Error boundaries

- Use route-level `error.tsx` and `not-found.tsx` where applicable.
- Never expose stack traces or internal endpoint details in UI.

Reference implementation in this repository:

- `apps/investor/app/error.tsx`
- `apps/distributor/app/error.tsx`

---

## 6. React Query standards

Use React Query only in client components and for client-side concerns.

### 6.1 Query key design

- Use centralized query key factories in `lib/query/queryKeys.ts`.
- Include stable identifiers only.
- Avoid dynamic object literals that break cache stability.

Example:

```ts
export const queryKeys = {
  funds: {
    all: ['funds'] as const,
    detail: (fundCode: string) => ['funds', 'detail', fundCode] as const,
  },
};
```

### 6.2 Defaults

- Set sane global defaults on `QueryClient`:
  - retries: conservative (e.g., 1 or 2)
  - stale time: tuned by endpoint volatility
  - gc time: aligned with memory budget
- Disable refetch-on-focus for endpoints where it causes jitter or unnecessary load.

### 6.3 Data ownership

- SSR data remains server-owned where possible.
- Use hydration intentionally for pages needing both SSR and client updates.
- Avoid duplicate fetch (server fetch + immediate client refetch) unless explicitly required.

### 6.4 Mutations

- Mutations must:
  - have typed payloads and responses
  - define optimistic updates only when safe
  - invalidate exact query keys, not broad wildcards

---

## 7. Axios standards

### 7.1 Single source of transport configuration

Create a single centralized Axios instance at platform level (`lib/api/axios.ts`) with:

- base URL from environment
- timeout policy
- request id / trace headers
- auth/session header attachment (if applicable)
- response normalization

### 7.2 Interceptors

- Request interceptors:
  - attach correlation id
  - sanitize headers
- Response interceptors:
  - normalize known API error envelope
  - map transport errors to typed application errors

### 7.2.1 Token handling standard

- Access tokens must be handled in secure cookies when possible.
- Do not store auth tokens in localStorage.
- If in-memory token handling is required for specific flows, it must be short-lived and never persisted.
- Refresh token flow must be centralized in Axios response interceptors with request replay guard to prevent infinite loops.
- Token refresh failures must force a clean sign-out and session reset.

### 7.2.2 Encryption and decryption standard

- Encryption/decryption helpers must be isolated in server-only modules.
- Interceptors may call encryption/decryption helpers only in server runtime paths.
- Browser code must never import encryption/decryption helpers directly.
- Request encryption and response decryption behavior must be transparent to features through service methods.
- Log statements must never print plaintext sensitive payloads before or after cryptographic operations.

### 7.2.3 Interceptor implementation guidelines

- Request interceptor must:
  - inject auth/correlation headers
  - optionally encrypt payload when endpoint policy requires it
  - redact sensitive fields from diagnostic logs
- Response interceptor must:
  - decrypt payload when endpoint policy requires it
  - normalize transport and business errors to typed `AppError`
  - trigger token refresh and one-time retry for 401 where policy allows
  - reject non-recoverable errors with safe user-facing metadata

### 7.3 API boundaries

- Keep endpoint paths centralized in `lib/api/endpoints.ts`.
- Service methods must return typed models, not raw Axios responses.
- Do not call Axios directly from UI components.

Reference implementation in this repository:

- Dummy endpoint and service example:
  - `lib/api/endpoints.ts` (`platform.ping`)
  - `lib/api/services.ts` (`getPlatformPing`)
- Matching query reference:
  - `lib/query/queryKeys.ts` (`platform.ping`)
  - `lib/query/queryOptions.ts` (`platformQueryOptions.ping`)

---

## 8. Security standards (non-negotiable)

This is a financial domain app. Security is mandatory.

### 8.1 Secret handling

- Never expose secrets in client bundles.
- Only `NEXT_PUBLIC_*` variables can be used in browser code.
- Keep signing keys, private keys, and service credentials server-only.

### 8.2 Data protection

- Encrypt sensitive server-to-upstream communication where required by backend contract.
- Do not implement sensitive cryptography in browser code.
- Do not log PII or sensitive payloads:
  - PAN
  - phone numbers
  - OTP
  - account/session tokens

### 8.2.1 Token and crypto controls

- Keep token issuance, refresh, encryption and decryption in server boundaries only.
- Enforce key rotation support and key-id based selection in crypto utilities.
- Define algorithm and key-size through secure server configuration, never in client code.
- Reject requests when decryption or signature validation fails; do not partially process data.

### 8.3 API hardening

- Route handlers must validate:
  - method
  - content type
  - auth context
  - payload schema
- Use explicit allowlists for proxy endpoints.
- Apply rate limiting and abuse controls on auth/OTP/sensitive routes.

### 8.4 Headers and browser protection

- Enforce security headers (via middleware/config):
  - Content-Security-Policy
  - X-Content-Type-Options
  - Referrer-Policy
  - X-Frame-Options or frame-ancestors CSP
- Use secure cookies:
  - `HttpOnly`
  - `Secure`
  - `SameSite=Lax` or stricter as flow allows

### 8.5 Dependency and supply-chain hygiene

- Keep lockfile committed.
- Run dependency audits in CI.
- Block known critical vulnerabilities before merge.

---

## 9. Performance standards

Targets for key public pages:

- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1

### 9.1 Rendering strategy

- Prefer server-rendered content for hero, scheme facts, and key CTAs.
- Keep client JS payload minimal.
- Use dynamic import for below-the-fold interactive widgets.

### 9.2 Images and media

- Use `next/image` for content images.
- Provide explicit sizes/aspect ratio to avoid CLS.
- Mark only true hero images as priority.

### 9.3 Caching and revalidation

- Use route-level caching/revalidation based on business freshness requirements.
- Avoid `force-dynamic` unless strictly needed.
- For expensive APIs, cache on server when contract allows.

### 9.4 Script policy

- Defer third-party scripts.
- Do not block initial render with analytics/chat/captcha scripts.
- Load non-critical scripts on idle or interaction.

### 9.5 Lists and tables

- Paginate large datasets.
- Virtualize long lists where UX allows.
- Use stable item keys from business ids.

---

## 10. MUI and design system guidelines

- Prefer `sx` with tokens over scattered inline constants.
- Do not hardcode colors/spacing repeatedly.
- Ensure contrast ratios satisfy WCAG AA.
- Reuse shared components before creating new variants.

### 10.1 SCSS usage with MUI

- Shared CSS variables and component-level SCSS modules remain the source of truth for design values.
- SCSS must follow the global-level strategy in section 3.7.
- Use SCSS modules for component-scoped styling and `globals.scss` for platform-wide foundations only.
- Do not introduce ad-hoc global style files outside `apps/*/styles`.

### 10.2 Icon policy

- Icons must be vector graphics only (SVG).
- Do not use PNG/JPG/WebP for icons.
- Place shared SVG icons in `packages/shared/icons`.
- For React usage, expose icon components from `packages/shared-ui` or app-local icon wrappers.
- Decorative icons must be `aria-hidden`; semantic icons require accessible labels.

Accessibility baseline:

- Keyboard reachable controls
- Visible focus state (`:focus-visible`)
- Correct labels and helper/error text association
- No color-only communication for returns/risk states
- Touch targets suitable for mobile users

---

## 11. Code quality and review gates

All PRs must pass:

- Type check
- Lint
- Security review for API/auth/crypto changes
- Performance sanity for pages with UI changes

Required scripts:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Review blockers:

- Secrets exposed in client code
- Unvalidated external payloads
- Large route marked `'use client'` without justification
- Direct Axios usage in components
- Missing metadata on public routes

---

## 12. CI/CD policy recommendations

- Enforce branch protection and mandatory checks.
- Run:
  - lint + typecheck on pull requests
  - build on pull requests
- Add Lighthouse/Web Vitals regression checks for critical pages.
- Add static analysis and secret scanning.

---

## 13. Implementation checklist for new feature/page

- [ ] Route created as server component by default
- [ ] Metadata configured (title, description, canonical, OG)
- [ ] Data contracts typed and validated
- [ ] API endpoint constant added centrally
- [ ] Service method implemented with typed Axios client
- [ ] Client state handled with React Query where needed
- [ ] Loading/empty/error states covered
- [ ] Security checks complete (no secrets, no PII logs)
- [ ] Accessibility checks complete
- [ ] Performance checks complete (image sizing, script deferral, minimal client JS)

---

## 14. Do and don't summary

Do:

- Build server-first routes with lean client islands
- Keep API and query logic centralized and typed
- Use shared style tokens and SCSS variables consistently
- Prioritize security, accessibility, and performance equally

Do not:

- Expose secrets or crypto internals to browser code
- Fetch directly from UI components without service/query layer
- Introduce broad global state for server-owned page data
- Ignore metadata, semantics, or mobile performance

---

This document is the coding standard baseline for ICICI Mutual Fund web applications in this repository.
