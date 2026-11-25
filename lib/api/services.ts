import { apiClient } from './axios';
import { toAppError } from './errors';
import { ENDPOINTS } from './endpoints';
import type { ApiSuccessEnvelope, PlatformPingResponse } from './types';

export interface FundSummary {
  fundCode: string;
  fundName: string;
  riskLevel: string;
}

/**
 * Fetches fund summary list through centralized transport layer.
 * @returns Typed fund summaries for UI consumption.
 */
export async function getFunds(): Promise<FundSummary[]> {
  const response = await apiClient.get<ApiSuccessEnvelope<FundSummary[]>>(ENDPOINTS.funds.list);
  return response.data.data;
}

/**
 * Dummy reference API call that demonstrates the recommended service pattern.
 * @returns Typed platform ping payload for health and connectivity checks.
 * @throws AppError when response shape is invalid or transport fails.
 */
export async function getPlatformPing(): Promise<PlatformPingResponse> {
  try {
    const response = await apiClient.get<ApiSuccessEnvelope<PlatformPingResponse>>(ENDPOINTS.platform.ping);
    const payload = response.data.data;

    if (!payload || payload.status !== 'ok' || !payload.timestamp || payload.source !== 'server') {
      throw toAppError(null, 'Invalid ping response received from server.');
    }

    return payload;
  } catch (error) {
    throw toAppError(error, 'Unable to fetch platform ping. Please try again.');
  }
}
