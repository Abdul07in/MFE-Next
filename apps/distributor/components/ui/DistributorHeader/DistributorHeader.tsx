'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type JSX } from 'react';

import { IMAGE_URL } from '@shared/utils/imageURL';
import { ROUTES } from '@platform/constants/routes';
import { Icon } from '@shared-ui/components/Icon';

import type { DistributorHeaderProps, DistributorNavItem } from './DistributorHeader.types';
import styles from './DistributorHeader.module.scss';

const DEFAULT_NAV_ITEMS: readonly DistributorNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: ROUTES.distributor.home, hasMenu: true },
  { id: 'mutual-funds', label: 'Mutual Funds', href: ROUTES.distributor.discover, hasMenu: true },
  { id: 'invest', label: 'Invest', hasMenu: true },
  { id: 'funds', label: 'Funds', hasMenu: true },
  { id: 'more', label: 'More', hasMenu: true },
];

/**
 * Top navigation header for the ICICI Prudential Mutual Fund Distributor platform.
 * Matches the Figma Make distributor header pattern with responsive navigation and utility actions.
 * @param props Optional brand label, nav items, active item id, badge count, and action handlers.
 * @returns Accessible site header element.
 */
export function DistributorHeader({
  title,
  navItems = DEFAULT_NAV_ITEMS,
  activeNavId = 'dashboard',
  notificationCount = 2,
  onNavSelect,
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
  onMenuClick,
}: DistributorHeaderProps): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const safeBrandLabel = title?.trim() || 'ICICI Prudential Mutual Fund';
  const badgeLabel = notificationCount > 99 ? '99+' : String(notificationCount);

  const handleMenuToggle = (): void => {
    setDrawerOpen((prev) => !prev);
    onMenuClick?.();
  };

  const renderNavItem = (item: DistributorNavItem, drawerVariant: boolean): JSX.Element => {
    const isActive = item.id === activeNavId;
    const itemClasses = [
      styles.distributorHeaderNavLink,
      isActive ? styles.distributorHeaderNavLinkActive : '',
      drawerVariant ? styles.distributorHeaderDrawerLink : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (item.href && !onNavSelect) {
      return (
        <Link
          key={item.id}
          href={item.href}
          className={itemClasses}
          aria-current={isActive ? 'page' : undefined}
          onClick={drawerVariant ? () => setDrawerOpen(false) : undefined}
        >
          <span>{item.label}</span>
          {item.hasMenu ? <Icon name="chevron-down" size={14} /> : null}
        </Link>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className={itemClasses}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          onNavSelect?.(item);
          if (drawerVariant) setDrawerOpen(false);
        }}
      >
        <span>{item.label}</span>
        {item.hasMenu ? <Icon name="chevron-down" size={14} /> : null}
      </button>
    );
  };

  return (
    <header className={`${styles.distributorHeader} distributor-header`}>
      <div className={`${styles.distributorHeaderInner} distributor-header__inner`}>
        <Link href={ROUTES.distributor.home} className={styles.distributorHeaderBrand}>
          <Image
            src={IMAGE_URL.ICICI_PRU_LOGO}
            alt={safeBrandLabel}
            width={106}
            height={74}
            priority
            className={styles.distributorHeaderLogo}
          />
        </Link>

        <nav className={`${styles.distributorHeaderNav} distributor-header__nav`} aria-label="Primary navigation">
          {navItems.map((item) => renderNavItem(item, false))}
        </nav>

        <div className={`${styles.distributorHeaderActions} distributor-header__actions`}>
          <button
            type="button"
            className={`${styles.distributorHeaderActionButton} ${styles.distributorHeaderSearchButton}`}
            aria-label="Search funds and investors"
            onClick={onSearchClick}
          >
            <Image src={IMAGE_URL.SEARCH_ASSIST_ICON} alt="" width={22} height={22} unoptimized aria-hidden="true" />
          </button>

          <button
            type="button"
            className={styles.distributorHeaderActionButton}
            aria-label={
              notificationCount > 0
                ? `Portfolio requests and notifications, ${notificationCount} unread`
                : 'Portfolio requests and notifications'
            }
            onClick={onNotificationsClick}
          >
            <Image src={IMAGE_URL.NOTIFICATION_BAG_ICON} alt="" width={22} height={22} unoptimized aria-hidden="true" />
            {notificationCount > 0 ? (
              <span className={styles.distributorHeaderBadge} aria-hidden="true">
                {badgeLabel}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            className={`${styles.distributorHeaderActionButton} ${styles.distributorHeaderAvatarButton}`}
            aria-label="Open distributor profile"
            onClick={onProfileClick}
          >
            <span className={styles.distributorHeaderAvatarFrame} aria-hidden="true">
              <Image src={IMAGE_URL.PROFILE_AVATAR_ICON} alt="" width={36} height={36} unoptimized />
            </span>
          </button>

          <button
            type="button"
            className={`${styles.distributorHeaderActionButton} ${styles.distributorHeaderMenuButton}`}
            aria-label="Toggle navigation menu"
            aria-expanded={drawerOpen}
            onClick={handleMenuToggle}
          >
            <span className={styles.distributorHeaderMenuBar} aria-hidden="true" />
            <span className={styles.distributorHeaderMenuBar} aria-hidden="true" />
            <span className={styles.distributorHeaderMenuBar} aria-hidden="true" />
          </button>
        </div>
      </div>

      {drawerOpen ? (
        <nav className={styles.distributorHeaderDrawer} aria-label="Mobile navigation">
          {navItems.map((item) => renderNavItem(item, true))}
        </nav>
      ) : null}
    </header>
  );
}
