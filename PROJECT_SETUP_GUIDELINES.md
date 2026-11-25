# Project Setup Guidelines

Version: 1.0
Applies to: This repository only

This guide explains how to install and manage packages for the monorepo.

## 1) Prerequisites

- Node.js 22.x or later
- npm 10.x or later

Recommended checks:

- `node -v`
- `npm -v`

## 2) Repository structure and package ownership

This repository uses npm workspaces with three ownership levels:

1. Root workspace package:
- `package.json`
- Owns workspace orchestration scripts and workspace mapping

2. App packages:
- `apps/investor/package.json`
- `apps/distributor/package.json`
- Own app runtime dependencies and app scripts

3. Shared packages:
- `packages/shared/package.json`
- `packages/shared-ui/package.json`
- Own reusable contracts/utilities and shared UI primitives

## 3) First-time installation

Run installation once from repository root:

- `npm install`

This installs all workspace dependencies and links internal workspace packages.

## 4) Where to install dependencies

Install dependencies at the correct scope.

1. Install in root (only for workspace-wide tooling):
- Example: lint tooling, formatting tooling, workspace-level dev tools
- Command:
  - `npm install -D <package-name>`

2. Install in investor app:
- Use when dependency is needed only by investor app
- Command:
  - `npm install -w @mfe/investor <package-name>`

3. Install in distributor app:
- Use when dependency is needed only by distributor app
- Command:
  - `npm install -w @mfe/distributor <package-name>`

4. Install in shared package:
- Use when dependency is needed by shared contracts/utils
- Command:
  - `npm install -w @mfe/shared <package-name>`

5. Install in shared-ui package:
- Use when dependency is needed by cross-app UI components
- Command:
  - `npm install -w @mfe/shared-ui <package-name>`

## 5) Dependency placement rules

- Do not install app-only dependencies at root.
- Keep UI dependencies closest to the app/package that uses them.
- Keep transport/data dependencies in app or platform layers where actually consumed.
- For reusable UI dependencies used by shared-ui components, install in `@mfe/shared-ui`.
- For peer frameworks (like `react` in shared-ui), use `peerDependencies` where appropriate.

## 6) Install command examples

Install `dayjs` in distributor only:

- `npm install -w @mfe/distributor dayjs`

Install `zod` in shared package:

- `npm install -w @mfe/shared zod`

Install workspace lint tool at root:

- `npm install -D eslint`

## 7) Updating dependencies

Update all dependencies using root install after manifest changes:

- `npm install`

Update one workspace package:

- `npm update -w @mfe/investor`
- `npm update -w @mfe/distributor`

## 8) Lockfile policy

- Commit lockfile changes with package manifest changes.
- Do not manually edit lockfile.
- Keep dependency updates small and scoped to intended workspaces.

## 9) Post-install verification

After dependency changes, run checks from root:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

If you changed only one app, still run root checks before opening PR.

## 10) Troubleshooting

1. Missing module/type errors:
- Run `npm install` at root.
- Confirm dependency is installed in the correct workspace.

2. Workspace package not found:
- Check workspace names in package manifests:
  - `@mfe/investor`
  - `@mfe/distributor`
  - `@mfe/shared`
  - `@mfe/shared-ui`

3. Duplicate or conflicting versions:
- Keep versions aligned when dependency is used by both apps.
- Move common dependencies to the most appropriate shared scope only when genuinely shared.

## 11) PR checklist for dependency changes

- [ ] Dependency installed in correct workspace scope
- [ ] No unnecessary root dependency additions
- [ ] Lockfile updated and committed
- [ ] Lint/typecheck/build pass
- [ ] Changes documented when global behavior is affected
