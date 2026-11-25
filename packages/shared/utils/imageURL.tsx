import type { StaticImageData } from 'next/image';

import ArrowRightIconSvg from '../assets/icons/ArrowRightIcon.svg';
import CheckIconSvg from '../assets/icons/CheckIcon.svg';
import ChevronDownIconSvg from '../assets/icons/ChevronDownIcon.svg';
import CloseIconSvg from '../assets/icons/CloseIcon.svg';
import EditIconSvg from '../assets/icons/EditIcon.svg';
import NotificationBagIconSvg from '../assets/icons/NotificationBagIcon.svg';
import PlusIconSvg from '../assets/icons/PlusIcon.svg';
import ProfileAvatarIconSvg from '../assets/icons/ProfileAvatarIcon.svg';
import SearchAssistIconSvg from '../assets/icons/SearchAssistIcon.svg';
import SearchIconSvg from '../assets/icons/SearchIcon.svg';
import IciciPruLogoPng from '../assets/images/icici-pru-logo.png';

export const ARROW_RIGHT_ICON: StaticImageData = ArrowRightIconSvg as StaticImageData;
export const CHECK_ICON: StaticImageData = CheckIconSvg as StaticImageData;
export const CHEVRON_DOWN_ICON: StaticImageData = ChevronDownIconSvg as StaticImageData;
export const CLOSE_ICON: StaticImageData = CloseIconSvg as StaticImageData;
export const EDIT_ICON: StaticImageData = EditIconSvg as StaticImageData;
export const ICICI_PRU_LOGO: StaticImageData = IciciPruLogoPng;
export const NOTIFICATION_BAG_ICON: StaticImageData = NotificationBagIconSvg as StaticImageData;
export const PLUS_ICON: StaticImageData = PlusIconSvg as StaticImageData;
export const PROFILE_AVATAR_ICON: StaticImageData = ProfileAvatarIconSvg as StaticImageData;
export const SEARCH_ASSIST_ICON: StaticImageData = SearchAssistIconSvg as StaticImageData;
export const SEARCH_ICON: StaticImageData = SearchIconSvg as StaticImageData;

/**
 * Centralized registry of shared image and SVG icon asset constants imported from `packages/shared/assets`.
 */
export const IMAGE_URL = {
  ARROW_RIGHT_ICON,
  CHECK_ICON,
  CHEVRON_DOWN_ICON,
  CLOSE_ICON,
  EDIT_ICON,
  ICICI_PRU_LOGO,
  NOTIFICATION_BAG_ICON,
  PLUS_ICON,
  PROFILE_AVATAR_ICON,
  SEARCH_ASSIST_ICON,
  SEARCH_ICON,
} as const;
