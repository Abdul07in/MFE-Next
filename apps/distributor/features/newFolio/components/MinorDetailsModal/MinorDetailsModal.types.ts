import type { MinorDetailsState } from '../../types';

export interface MinorDetailsModalProps {
  /** Whether the minor details dialog is open. */
  open: boolean;
  /** Closes the modal without discarding entered minor details. */
  onClose: () => void;
  /** Minor's DOB ISO `YYYY-MM-DD` string shared with the primary form DOB field. */
  dob: string;
  /** Maximum selectable DOB (ISO `YYYY-MM-DD`). */
  maxDob: string;
  /** Updates the minor's DOB on the parent form. */
  onDobChange: (nextDob: string) => void;
  /** Minor document & relationship details. */
  value: MinorDetailsState;
  /** Updates minor details state. */
  onChange: (nextValue: MinorDetailsState) => void;
}
