import { queryOptions } from '@tanstack/react-query';

import { getFunds, getPlatformPing } from '../api/services';
import { queryKeys } from './queryKeys';

export const platformQueryOptions = {
  ping: () =>
    queryOptions({
      queryKey: queryKeys.platform.ping,
      queryFn: getPlatformPing,
      staleTime: 15_000,
    }),
};

export const fundsQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: queryKeys.funds.all,
      queryFn: getFunds,
    }),
};
