# Input

## Usage

Shared `48px` text input with `12px` radius, `1.5px` border, and `default` / `success` / `error` / `disabled` states.

## Accessibility notes

- Associates `<label>` via `htmlFor` and wires `aria-invalid` + `aria-describedby` for error and helper text.

## Example

```tsx
<Input label="Mobile Number" placeholder="9876543210" startAdornment={<span>+91</span>} />
```
