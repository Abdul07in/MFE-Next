# DistributorHeader

## Usage

Top navigation header for `@mfe/distributor`, implementing the Figma Make ICICI Prudential Mutual Fund distributor header layout with brand logo, primary navigation links, search assist, portfolio/notification badge, profile avatar, and responsive menu drawer.

## Optional props

- `title`: Accessible brand logo alt text override (defaults to `'ICICI Prudential Mutual Fund'`).
- `navItems`: Custom navigation link array (defaults to `Dashboard`, `Mutual Funds`, `Invest`, `Funds`, `More`).
- `activeNavId`: Highlights the current route/section (`'dashboard'` by default).
- `notificationCount`: Badge count on the bag icon (`2` by default; hidden when `0`).
- `onNavSelect`, `onSearchClick`, `onNotificationsClick`, `onProfileClick`, `onMenuClick`

## Accessibility notes

- Uses `<header>` + `<nav aria-label="Primary navigation">`, `aria-current="page"`, descriptive `aria-label` on icon-only controls, `aria-expanded` on the menu trigger, and visible `:focus-visible` rings.

## Example

```tsx
<DistributorHeader activeNavId="dashboard" notificationCount={2} />
```
