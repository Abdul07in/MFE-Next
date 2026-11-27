# JointHoldersSection

## Usage

Renders Secondary and optional Tertiary holder inputs whenever `Account Type` is set to `Either / Survivor`.

## Props

- `hasSecondary` / `hasTertiary`: controls visibility of each joint holder card
- `secondaryHolder` / `tertiaryHolder`: `JointHolderDetails` objects
- `maxDob`: ISO `YYYY-MM-DD` bound passed to shared MUI `DatePicker`
- `onToggleSecondary` / `onToggleTertiary`: toggle holder cards (removing tertiary resets its state in parent)
- `onSecondaryChange` / `onTertiaryChange`: emit updated holder fields

## Accessibility notes

- Each holder card uses a labeled `<section>` landmark (`Secondary Holder` / `Tertiary Holder`) with inline field validation (`role="alert"`) and accessible `Belongs To` MUI selects.
