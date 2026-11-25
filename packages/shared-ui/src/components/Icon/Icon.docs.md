# Icon

## Usage

Renders vector SVG icons shared across investor and distributor flows. Mirrors raw SVG sources in `packages/shared/icons`.

## Required props

- `name`: `'check' | 'close' | 'plus' | 'edit' | 'arrow-right' | 'search' | 'chevron-down'`

## Accessibility notes

- Decorative icons omit `label` and automatically set `aria-hidden="true"`.
- Standalone semantic icons must pass a descriptive `label`.

## Example

```tsx
<Icon name="arrow-right" size={16} />
<Icon name="search" label="Search funds" />
```
