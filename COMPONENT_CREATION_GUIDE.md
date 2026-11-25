# Component Creation Guide

Version: 1.0
Applies to: This repository only

This guide provides a practical workflow for creating new components in investor, distributor, and shared-ui modules.

## 1) Choose the right location first

Use this decision order before creating files:

1. Cross-app reusable UI component:
- Create in `packages/shared-ui/src/components/<ComponentName>/`

2. App-specific reusable component:
- Create in `apps/investor/components/...` or `apps/distributor/components/...`

3. Feature-specific component:
- Create in `apps/<app>/features/<feature>/components/<ComponentName>/`

Do not import app-local modules into shared-ui.

## 2) Mandatory component file contract

Each component folder must contain:

- `<ComponentName>.tsx`
- `<ComponentName>.types.ts`
- `<ComponentName>.module.scss`
- `index.ts`

Optional but recommended:

- `<ComponentName>.docs.md` (strongly recommended for reusable components)

## 3) Naming conventions

- Component folder and file name: PascalCase (`FundCard`)
- Props interface: PascalCase with `Props` suffix (`FundCardProps`)
- SCSS module class names: camelCase and component-based (`distributorHeader`, `distributorHeaderTitle`)
- Keep one component per folder and per `*.tsx` file
- Avoid generic class names such as `root`, `title`, `wrapper`, `container`
- Keep stable debug-friendly DOM classes where useful (for example `distributor-header`, `distributor-header__title`)

## 4) Dependency and layering rules

- Components must not call raw Axios directly.
- Use centralized service methods from `lib/api/services.ts` or shared service contracts.
- Route strings must come from constants (`lib/constants/routes.ts` or shared constants).
- Reusable hooks belong in `packages/shared/hooks`.

## 5) TSDoc requirements

All exported components and non-trivial functions must include TSDoc:

- Purpose summary
- Parameters
- Return value
- Thrown errors when relevant
- Security-sensitive notes when relevant

Example:

```ts
/**
 * Renders a compact fund card with risk classification.
 * @param props Typed fund model for UI rendering.
 * @returns Fund card section markup.
 */
export function FundCard(props: FundCardProps): JSX.Element {
  // implementation
}
```

## 6) Accessibility baseline (WCAG 2.2 AA)

Every component should pass this checklist:

- Keyboard reachable interactions
- Visible `:focus-visible` state
- Correct semantic role and labels
- No color-only communication
- Touch-friendly targets on mobile
- Decorative icons use `aria-hidden`
- Semantic icons include accessible labeling

## 7) Styling rules

- Use component-scoped SCSS modules (`*.module.scss`).
- Reuse shared CSS variables and global style tokens; avoid repeated hardcoded values.
- Do not create ad-hoc global style files for component styling.
- Keep layout and spacing consistent with existing patterns.
- Author styles mobile-first: define small-screen defaults, then enhance with `min-width` media queries.

## 7.1) Null-safety rules for component props

- Prefer optional or nullable input props only when the component can safely recover.
- Normalize nullable values before rendering.
- Provide safe fallback UI text for display fields.

Example:

```ts
const safeTitle = title?.trim() || 'Distributor';
```

## 8) Component scaffolding templates

### 8.1 Folder template

```text
<ComponentName>/
  <ComponentName>.tsx
  <ComponentName>.types.ts
  <ComponentName>.module.scss
  index.ts
```

### 8.2 Type template (`<ComponentName>.types.ts`)

```ts
export interface ComponentNameProps {
  title: string;
  description?: string;
}
```

### 8.3 Component template (`<ComponentName>.tsx`)

```tsx
import type { JSX } from 'react';

import type { ComponentNameProps } from './ComponentName.types';
import styles from './ComponentName.module.scss';

/**
 * Purpose summary of this component.
 * @param props Component input contract.
 * @returns Rendered component.
 */
export function ComponentName({ title, description }: ComponentNameProps): JSX.Element {
  const safeTitle = title?.trim() || 'Default Title';

  return (
    <section className={`${styles.componentName} component-name`}>
      <h2 className={`${styles.componentNameTitle} component-name__title`}>{safeTitle}</h2>
      {description ? <p className={styles.componentNameDescription}>{description}</p> : null}
    </section>
  );
}
```

### 8.4 SCSS module template (`<ComponentName>.module.scss`)

```scss
.componentName {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.componentNameTitle {
  margin: 0;
}

.componentNameDescription {
  margin-top: var(--space-2);
}

@media (min-width: 48rem) {
  .componentName {
    padding: var(--space-6);
  }
}
```

### 8.5 Export template (`index.ts`)

```ts
export * from './ComponentName';
export type * from './ComponentName.types';
```

## 9) Shared component docs template (`<ComponentName>.docs.md`)

```md
# ComponentName

## Usage
Brief purpose and where to use.

## Required props
- `title`

## Accessibility notes
- Explain labeling and keyboard behavior.

## Example
```tsx
<ComponentName title="Sample" />
```
```

## 10) Pre-PR component checklist

- [ ] Correct location selected (shared-ui vs app vs feature)
- [ ] Mandatory file contract followed
- [ ] TSDoc added for exported component/functions
- [ ] Accessibility baseline covered
- [ ] No direct Axios usage in component
- [ ] Route/constants not hardcoded
- [ ] Style values aligned with shared variables/tokens
- [ ] Class names are component-based (no generic root/title naming)
- [ ] Mobile-first styles with explicit breakpoint enhancements
- [ ] Nullable props are normalized with safe fallbacks
- [ ] Docs added for reusable shared components

## 11) Quick examples for this repo

- Investor feature component:
  - `apps/investor/features/funds/components/FundCard/`

- Distributor feature component:
  - `apps/distributor/features/leads/components/LeadCard/`

- Shared reusable component:
  - `packages/shared-ui/src/components/Button/`
