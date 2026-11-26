import type { StaticImageData } from 'next/image';

import ArrowRightIconSvg from '../assets/icons/ArrowRightIcon.svg';
import BannerStepperWaveSvg from '../assets/icons/BannerStepperWave.svg';
import CheckIconSvg from '../assets/icons/CheckIcon.svg';
import ChevronDownIconSvg from '../assets/icons/ChevronDownIcon.svg';
import ChevronRightLightIconSvg from '../assets/icons/ChevronRightLightIcon.svg';
import CloseIconSvg from '../assets/icons/CloseIcon.svg';
import EditIconSvg from '../assets/icons/EditIcon.svg';
import FatcaShieldIconSvg from '../assets/icons/FatcaShieldIcon.svg';
import NotificationBagIconSvg from '../assets/icons/NotificationBagIcon.svg';
import PencilEditIconSvg from '../assets/icons/PencilEditIcon.svg';
import PlusIconSvg from '../assets/icons/PlusIcon.svg';
import ProfileAvatarIconSvg from '../assets/icons/ProfileAvatarIcon.svg';
import RecommendedRibbonIconSvg from '../assets/icons/RecommendedRibbonIcon.svg';
import SearchAssistIconSvg from '../assets/icons/SearchAssistIcon.svg';
import SearchIconSvg from '../assets/icons/SearchIcon.svg';
import ShieldCheckIconSvg from '../assets/icons/ShieldCheckIcon.svg';
import BannerBgPng from '../assets/images/banner-bg.png';
import IciciPruLogoPng from '../assets/images/icici-pru-logo.png';

export const ARROW_RIGHT_ICON: StaticImageData = ArrowRightIconSvg as StaticImageData;
export const BANNER_STEPPER_WAVE: StaticImageData = BannerStepperWaveSvg as StaticImageData;
export const CHECK_ICON: StaticImageData = CheckIconSvg as StaticImageData;
export const CHEVRON_DOWN_ICON: StaticImageData = ChevronDownIconSvg as StaticImageData;
export const CHEVRON_RIGHT_LIGHT_ICON: StaticImageData =
  ChevronRightLightIconSvg as StaticImageData;
export const CLOSE_ICON: StaticImageData = CloseIconSvg as StaticImageData;
export const EDIT_ICON: StaticImageData = EditIconSvg as StaticImageData;
export const FATCA_SHIELD_ICON: StaticImageData = FatcaShieldIconSvg as StaticImageData;
export const FOLIO_BANNER_BG: StaticImageData = BannerBgPng;
export const ICICI_PRU_LOGO: StaticImageData = IciciPruLogoPng;
export const NOTIFICATION_BAG_ICON: StaticImageData = NotificationBagIconSvg as StaticImageData;
export const PENCIL_EDIT_ICON: StaticImageData = PencilEditIconSvg as StaticImageData;
export const PLUS_ICON: StaticImageData = PlusIconSvg as StaticImageData;
export const PROFILE_AVATAR_ICON: StaticImageData = ProfileAvatarIconSvg as StaticImageData;
export const RECOMMENDED_RIBBON_ICON: StaticImageData = RecommendedRibbonIconSvg as StaticImageData;
export const SEARCH_ASSIST_ICON: StaticImageData = SearchAssistIconSvg as StaticImageData;
export const SEARCH_ICON: StaticImageData = SearchIconSvg as StaticImageData;
export const SHIELD_CHECK_ICON: StaticImageData = ShieldCheckIconSvg as StaticImageData;

/**
 * Centralized registry of shared image and SVG icon asset constants imported from `packages/shared/assets`.
 */
export const IMAGE_URL = {
  ARROW_RIGHT_ICON,
  BANNER_STEPPER_WAVE,
  CHECK_ICON,
  CHEVRON_DOWN_ICON,
  CHEVRON_RIGHT_LIGHT_ICON,
  CLOSE_ICON,
  EDIT_ICON,
  FATCA_SHIELD_ICON,
  FOLIO_BANNER_BG,
  ICICI_PRU_LOGO,
  NOTIFICATION_BAG_ICON,
  PENCIL_EDIT_ICON,
  PLUS_ICON,
  PROFILE_AVATAR_ICON,
  RECOMMENDED_RIBBON_ICON,
  SEARCH_ASSIST_ICON,
  SEARCH_ICON,
  SHIELD_CHECK_ICON,
} as const;
