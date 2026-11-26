# DatePicker

## Usage

Standardized Material UI X DatePicker (`@mui/x-date-pickers/DatePicker` with `AdapterDayjs`) aligned with the ICICI Pru Design System (`48px` height, `12px` radius, `1.5px` border, custom orange focus and calendar surface styling).

## Optional props

- `value`: ISO date string (`YYYY-MM-DD`) or `''`
- `onValueChange`: convenience callback receiving `YYYY-MM-DD` on valid selection or `''` when cleared/invalid
- `format`: display format (`DD/MM/YYYY` by default)
- `minDate` / `maxDate`: inclusive ISO date bounds (`YYYY-MM-DD`)
- `disableFuture` / `disablePast`: convenience boolean date constraints
- `state`, `helperText`, `errorText`, `disabled`, `readOnly`

## Accessibility notes

- Associates `<label>` via `aria-labelledby`, wires `aria-invalid` and `aria-describedby` for helper/error messages, and uses MUI X accessible keyboard section navigation plus calendar dialog/popover controls.

## Example

```tsx
<DatePicker
  label="DATE OF BIRTH"
  disableFuture
  maxDate={todayIso}
  value={dob}
  onValueChange={setDob}
/>
```
