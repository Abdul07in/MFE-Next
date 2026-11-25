# MFE Next Platform

Monorepo baseline for investor and distributor experiences.

## Documentation

- [CODING_STANDARDS.md](CODING_STANDARDS.md)
- [GLOBAL_CONFIG.md](GLOBAL_CONFIG.md)
- [COMPONENT_CREATION_GUIDE.md](COMPONENT_CREATION_GUIDE.md)

## Apps

- `apps/investor`
- `apps/distributor`

## Shared packages

- `packages/shared`
- `packages/shared-ui`

## Common commands

- `npm run dev:investor`
- `npm run dev:distributor`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Reference implementations

- Dummy API pattern (endpoint -> service -> query key -> query options):
	- `lib/api/endpoints.ts`
	- `lib/api/services.ts`
	- `lib/query/queryKeys.ts`
	- `lib/query/queryOptions.ts`
- Route-level error boundaries:
	- `apps/investor/app/error.tsx`
	- `apps/distributor/app/error.tsx`
