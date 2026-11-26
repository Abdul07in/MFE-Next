import type { FatcaFormState, ResidentialStatusOption } from '../../types';

export interface FatcaDetailsCardProps {
  /** Current FATCA declaration values. */
  value: FatcaFormState;
  /** Callback invoked whenever any FATCA field is edited. */
  onChange: (next: FatcaFormState) => void;
  /** Whether the FATCA query is currently loading. */
  isLoading?: boolean;
  /** Optional error message if the FATCA fetch failed. */
  errorMessage?: string;
  /** Retry handler when FATCA fetch fails. */
  onRetry?: () => void;
  /** Current investor residential status (drives USA/Canada FATCA consent banner). */
  residentialStatus?: ResidentialStatusOption;
}
