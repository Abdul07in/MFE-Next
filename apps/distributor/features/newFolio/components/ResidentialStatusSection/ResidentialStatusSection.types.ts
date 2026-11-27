import type {
  OverseasAddressDetails,
  ResidenceOtherOption,
  ResidentialStatusOption,
} from '../../types';

export interface ResidentialStatusSectionProps {
  /** Primary residential status selection (`india`, `usa`, `other`). */
  residentialStatus: ResidentialStatusOption;
  /** Sub-selection when `residentialStatus` is `other`. */
  residenceOther: ResidenceOtherOption;
  /** NRI overseas address fields. */
  overseasAddress: OverseasAddressDetails;
  /** Controls the USA/Canada branch-only alert modal. */
  usaModalOpen: boolean;
  /** Controls the Foreign National / PIO offline KYC modal. */
  offlineKycModalOpen: boolean;
  /** Updates the `other` sub-selection (`nri`, `foreign`, `pio`). */
  onResidenceOtherChange: (nextOption: Exclude<ResidenceOtherOption, ''>) => void;
  /** Updates NRI overseas address fields. */
  onOverseasAddressChange: (nextAddress: OverseasAddressDetails) => void;
  /** Closes the USA/Canada notice modal. */
  onCloseUsaModal: () => void;
  /** Closes the Foreign National / PIO offline KYC modal. */
  onCloseOfflineKycModal: () => void;
}
