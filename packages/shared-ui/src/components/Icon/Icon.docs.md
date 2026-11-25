# Icon

## Usage

Renders vector SVG icons stored in `packages/shared/assets/icons` and exported through `packages/shared/utils/imageURL.tsx`.

## Required props

- `name`: `'check' | 'close' | 'plus' | 'edit' | 'arrow-right' | 'search' | 'chevron-down'`

## Accessibility notes

- Decorative icons omit `label` and automatically set `aria-hidden="true"`.
- Standalone semantic icons must pass a descriptive `label` (`role="img"` + `aria-label`).

## Example

```tsx
<Icon name="arrow-right" size={16} />
<Icon name="search" label="Search funds" />
```
