# MinorDetailsModal

## Usage

Modal dialog displayed when `Account Type` is switched to `Minor`, allowing collection of minor identity, guardian relationship, and DOB/relationship proof documents.

## Props

- `open`: controls dialog visibility
- `onClose`: closes dialog (`Skip` or `Continue`)
- `dob` / `maxDob` / `onDobChange`: synchronized with primary form `Minor's Date of Birth` via shared MUI `DatePicker`
- `value` / `onChange`: `MinorDetailsState` for name, relationship, proof types, and uploaded filenames

## Accessibility notes

- Built on shared `Modal` (`role="dialog"`, `aria-modal="true"`, Escape close) with accessible file input labeling and `role="alert"` upload validation errors.
