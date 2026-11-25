# IconButton

## Usage

Compact square (`8px` radius) or round (`999px`) icon-only action button in `44px` (`md`) or `34px` (`sm`) sizes.

## Required props

- `icon`
- `aria-label`

## Accessibility notes

- `aria-label` is enforced at the TypeScript level.
- Ensure the inner icon is decorative (`aria-hidden="true"`).

## Example

```tsx
<IconButton icon={<Icon name="plus" />} aria-label="Add nominee" shape="round" ctaShadow />
```
