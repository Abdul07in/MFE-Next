# Checkbox

## Usage

Standard checkbox (`20px` control, `6px` radius) for consent declarations and multi-select options.

## Required props

- `label`

## Accessibility notes

- Preserves native `<input type="checkbox">` keyboard and screen-reader semantics with `:focus-visible` outline.

## Example

```tsx
<Checkbox label="I agree to the terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
```
