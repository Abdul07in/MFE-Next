import type { Metadata } from 'next';
import type { JSX, PropsWithChildren } from 'react';

import { AppProviders } from '@components/layout/AppProviders';
import {
  APP_NAME_DISTRIBUTOR,
  GOOGLE_FONTS_API_ORIGIN,
  GOOGLE_FONTS_STATIC_ORIGIN,
  MULISH_GOOGLE_FONTS_URL,
} from '@platform/constants/app';

import '../../../styles/globals.scss';

export const metadata: Metadata = {
  title: APP_NAME_DISTRIBUTOR,
  description: 'Distributor platform for ICICI Prudential Mutual Fund',
};

/**
 * Root layout for the distributor Next.js application.
 * Loads global design-system styles and the Mulish typeface from Google Fonts CDN.
 * @param props Children rendered inside the document body.
 * @returns Root HTML document shell.
 */
export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href={GOOGLE_FONTS_API_ORIGIN} />
        <link rel="preconnect" href={GOOGLE_FONTS_STATIC_ORIGIN} crossOrigin="anonymous" />
        <link rel="stylesheet" href={MULISH_GOOGLE_FONTS_URL} />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
