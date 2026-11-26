import type { PanVerifyResponse } from '@platform/api/types';

import type { ClientDetailsFormState } from '../../types';

export interface ClientDetailsFormProps {
  /** Optional initial 10-digit mobile value. */
  initialMobile?: string;
  /** Callback fired when PAN verification succeeds via the mock PAN API. */
  onPanVerified?: (payload: PanVerifyResponse) => void;
  /** Callback fired when PAN becomes incomplete/cleared. */
  onPanCleared?: () => void;
  /** Callback fired when Client Details form state changes. */
  onFormChange?: (values: ClientDetailsFormState) => void;
}
