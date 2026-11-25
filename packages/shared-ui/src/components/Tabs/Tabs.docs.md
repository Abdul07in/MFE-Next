# Tabs

## Usage

Underline tab navigation (`3px` `#DC6009` active underline) for switching between views of the same content.

## Required props

- `items`
- `activeId`
- `onChange`

## Accessibility notes

- Implements `role="tablist"`, `role="tab"`, `aria-selected`, and `ArrowLeft`/`ArrowRight`/`Home`/`End` keyboard navigation.

## Example

```tsx
<Tabs
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
>
  <p>Active content</p>
</Tabs>
```
