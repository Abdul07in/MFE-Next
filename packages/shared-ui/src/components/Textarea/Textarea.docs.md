# Textarea

## Usage

Shared multi-line text field for notes, remarks, and addresses.

## Accessibility notes

- Connects `<label>` via `htmlFor` and sets `aria-invalid` / `aria-describedby` on error.

## Example

```tsx
<Textarea label="Remarks" placeholder="Add a note" rows={3} />
```
