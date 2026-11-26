# Select

## Usage

Standardized Material UI (`@mui/material/Select`) dropdown aligned with the ICICI Pru Design System (`48px` height, `12px` radius, `1.5px` border, custom orange focus and menu states).

## Required props

- `options`

## Optional props

- `size`: `'md' | 'sm'` (`'md'` standard `48px` input, `'sm'` compact `34px` embedded selector)
- `onValueChange`: convenience callback receiving the selected `string` value
- `onChange`: standard MUI `SelectChangeEvent<string>` callback

## Accessibility notes

- Associates `<label>` via `aria-labelledby`, wires `aria-invalid` and `aria-describedby` for errors/helpers, and provides full keyboard menu navigation via MUI Select.

## Example

```tsx
<Select
  label="Account Type"
  placeholder="Select type"
  value={accountType}
  onValueChange={setAccountType}
  options={[
    { value: 'individual', label: 'Individual' },
    { value: 'minor', label: 'Minor' },
  ]}
/>
```
