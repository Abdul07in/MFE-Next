# SegmentedControl

## Usage

Two-or-more option segmented toggle (`46px` height) matching the Design System payment/bank mode switcher.

## Required props

- `options`
- `value`
- `onChange`

## Accessibility notes

- Exposes `role="radiogroup"` with `role="radio"` and `aria-checked` on each segment.

## Example

```tsx
<SegmentedControl
  aria-label="Verification mode"
  value={mode}
  onChange={setMode}
  options={[
    { value: 'upi', label: 'UPI' },
    { value: 'netbanking', label: 'NetBanking' },
  ]}
/>
```
