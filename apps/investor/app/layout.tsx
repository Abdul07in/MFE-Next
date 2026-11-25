import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import type { JSX, PropsWithChildren } from 'react';

import { APP_NAME_INVESTOR } from '@platform/constants/app';

import '../../../styles/globals.scss';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-mulish',
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_NAME_INVESTOR,
  description: 'Investor platform for ICICI Prudential Mutual Fund',
};

/**
 * Root layout for the investor Next.js application.
 * Loads global design-system styles and the Mulish typeface.
 * @param props Children rendered inside the document body.
 * @returns Root HTML document shell.
 */
export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="en-IN" className={mulish.variable}>
      <body>{children}</body>
    </html>
  );
}
