# Chip

## Usage

Interactive pill chip for selectable tags, presets, and filter options.

## Required props

- `children`

## Accessibility notes

- Sets `aria-pressed` to communicate toggle selection state to assistive technologies.

## Example

```tsx
<Chip active={selected} onClick={() => setSelected(!selected)}>
  Salaried
</Chip>
```
