# Card

## Usage

Shared surface container (`16px` radius, responsive `20px`–`28px` padding) supporting `default`, `selected`, and `info` variants.

## Required props

- `children`

## Accessibility notes

- Use `as="section"` or `as="article"` when the card represents a landmark or self-contained item.

## Example

```tsx
<Card variant="info" padding="md">
  <p>We use mobile to fetch KYC-verified PAN and FATCA declarations.</p>
</Card>
```
