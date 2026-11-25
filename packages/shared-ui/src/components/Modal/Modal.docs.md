# Modal

## Usage

Blocking confirmation dialog (`20px` radius, `420px` max width, 55% scrim). Design guidelines recommend a maximum of two actions (`secondary` + `primary`).

## Required props

- `open`
- `onClose`
- `title`

## Accessibility notes

- Sets `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- Supports closing via the `Escape` key and an `aria-label="Close dialog"` button.

## Example

```tsx
<Modal
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="Discard changes?"
  description="Your unsaved details will be lost. This action cannot be undone."
  actions={
    <>
      <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleDiscard}>Discard</Button>
    </>
  }
/>
```
