# Button

## Usage

Shared action button aligned with the ICICI Pru Design System (`44px` default height, `8px` radius, uppercase Mulish 800). Keep one primary action per view and pair with `secondary` or `ghost`.

## Required props

- `children`

## Optional props

- `variant`: `'primary' | 'secondary' | 'ghost'` (default `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `pill`, `ctaShadow`, `fullWidth`, `loading`, `leftIcon`, `rightIcon`

## Accessibility notes

- Defaults `type="button"` to prevent unintended form submissions.
- Exposes `aria-busy` when `loading` is true and uses `:focus-visible` focus rings.

## Example

```tsx
<Button variant="primary" ctaShadow onClick={onContinue}>
  Continue
</Button>
```
