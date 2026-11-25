# Select

## Usage

Shared `48px` dropdown control matching `Input` dimensions, border radius, and validation states.

## Required props

- `options`

## Accessibility notes

- Associates `<label>` via `htmlFor` and sets `aria-invalid` / `aria-describedby` on error.

## Example

```tsx
<Select
  label="Occupation"
  placeholder="Select option"
  defaultValue=""
  options={[
    { value: 'salaried', label: 'Salaried' },
    { value: 'self-employed', label: 'Self employed' },
  ]}
/>
```
