import type { JointHolderDetails } from '../../types';

export interface JointHoldersSectionProps {
  /** Controls visibility of Secondary Holder card. */
  hasSecondary: boolean;
  /** Controls visibility of Tertiary Holder card. */
  hasTertiary: boolean;
  /** Secondary holder form values. */
  secondaryHolder: JointHolderDetails;
  /** Tertiary holder form values. */
  tertiaryHolder: JointHolderDetails;
  /** Maximum selectable DOB (ISO `YYYY-MM-DD`). */
  maxDob: string;
  /** Toggles Secondary Holder visibility. */
  onToggleSecondary: (enabled: boolean) => void;
  /** Toggles Tertiary Holder visibility. */
  onToggleTertiary: (enabled: boolean) => void;
  /** Updates Secondary Holder fields. */
  onSecondaryChange: (nextHolder: JointHolderDetails) => void;
  /** Updates Tertiary Holder fields. */
  onTertiaryChange: (nextHolder: JointHolderDetails) => void;
}
