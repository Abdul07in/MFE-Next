'use client';

import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type JSX } from 'react';

import { createQueryClient } from '@platform/query/queryClient';

import { investorTheme } from '../../../theme';
import type { AppProvidersProps } from './AppProviders.types';

/**
 * Client-side React Query and MUI Theme provider shell for the investor application.
 * @param props Children rendered inside the provider tree.
 * @returns Provider-wrapped application subtree.
 */
export function AppProviders({ children }: AppProvidersProps): JSX.Element {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={investorTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
