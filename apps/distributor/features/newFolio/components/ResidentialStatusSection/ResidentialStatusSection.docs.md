# ResidentialStatusSection

## Usage

Renders conditional residential status workflows beneath Step 1 Client Details when `Residential Status` changes from `India` to `USA/Canada` or `Other`.

## Behavior

- `usa`: displays nearest-branch assistance modal and persistent inline notice.
- `other`: displays `Non Resident Indian`, `Foreign National`, and `Person Of Indian Origin` radio cards with accessible tooltips.
- `other` + `nri`: reveals `Overseas Address Details` (`Address`, `Country` MUI `Select`, `City`, `State`, `Pin Code`).
- `other` + `foreign` | `pio`: displays offline branch KYC instructions modal and inline notice.
