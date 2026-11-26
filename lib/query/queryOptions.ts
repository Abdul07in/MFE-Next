import { queryOptions } from '@tanstack/react-query';

import { getClientFatcaDetails, getFunds, getPlatformPing } from '../api/services';
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

export const distributorQueryOptions = {
  fatca: (pan: string) =>
    queryOptions({
      queryKey: queryKeys.distributor.fatca(pan),
      queryFn: () => getClientFatcaDetails(pan),
      enabled: pan.length === 10,
      staleTime: 60_000,
    }),
};
