# RadioGroup

## Usage

Single-choice radio group (`20px` circular control with `#DC6009` active indicator).

## Required props

- `name`
- `options`

## Accessibility notes

- Wraps options in `<fieldset>` + `<legend>` and preserves native keyboard arrow navigation.

## Example

```tsx
<RadioGroup
  name="holdingMode"
  label="Holding nature"
  value={holding}
  onChange={setHolding}
  options={[
    { value: 'individual', label: 'Individual' },
    { value: 'joint', label: 'Joint' },
  ]}
/>
```
