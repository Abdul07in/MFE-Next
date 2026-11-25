# Switch

## Usage

Binary on/off toggle switch (`44px x 26px` track, `#DC6009` active fill).

## Required props

- `checked`
- `onChange`

## Accessibility notes

- Uses `role="switch"` and `aria-checked`, with keyboard activation via Space/Enter and visible `:focus-visible` ring.

## Example

```tsx
<Switch label="Auto-debit active" checked={enabled} onChange={setEnabled} />
```
