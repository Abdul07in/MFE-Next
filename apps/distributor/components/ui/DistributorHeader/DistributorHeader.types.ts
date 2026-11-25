export interface DistributorNavItem {
  id: string;
  label: string;
  href?: string;
  hasMenu?: boolean;
}

export interface DistributorHeaderProps {
  /** Optional accessible title / brand override. */
  title?: string | null;
  /** Navigation items rendered in the primary bar and mobile drawer. */
  navItems?: readonly DistributorNavItem[];
  /** Currently active navigation item id. */
  activeNavId?: string;
  /** Unread notifications / cart badge count shown on the bag icon. */
  notificationCount?: number;
  /** Callback invoked when a navigation item is selected. */
  onNavSelect?: (item: DistributorNavItem) => void;
  /** Callback invoked when the search button is clicked. */
  onSearchClick?: () => void;
  /** Callback invoked when the bag/notifications button is clicked. */
  onNotificationsClick?: () => void;
  /** Callback invoked when the user avatar button is clicked. */
  onProfileClick?: () => void;
  /** Callback invoked when the menu button is clicked on desktop. */
  onMenuClick?: () => void;
}
