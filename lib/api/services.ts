import { apiClient } from './axios';
import { ENDPOINTS } from './endpoints';
import { toAppError } from './errors';
import type {
  ApiSuccessEnvelope,
  FatcaDetailsResponse,
  PanVerifyRequest,
  PanVerifyResponse,
  PlatformPingResponse,
} from './types';

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
    const response = await apiClient.get<ApiSuccessEnvelope<PlatformPingResponse>>(
      ENDPOINTS.platform.ping,
    );
    const payload = response.data.data;

    if (!payload || payload.status !== 'ok' || !payload.timestamp || payload.source !== 'server') {
      throw toAppError(null, 'Invalid ping response received from server.');
    }

    return payload;
  } catch (error) {
    throw toAppError(error, 'Unable to fetch platform ping. Please try again.');
  }
}

/**
 * Verifies an investor PAN via the centralized distributor API transport.
 * @param pan 10-character uppercase PAN string.
 * @returns Verified PAN holder metadata and default account/residency classification.
 * @throws AppError when transport or response validation fails.
 */
export async function verifyClientPan(pan: string): Promise<PanVerifyResponse> {
  try {
    const payload: PanVerifyRequest = { pan };
    const response = await apiClient.post<ApiSuccessEnvelope<PanVerifyResponse>>(
      ENDPOINTS.distributor.verifyPan,
      payload,
    );
    const result = response.data.data;

    if (!result || !result.pan || typeof result.verified !== 'boolean') {
      throw toAppError(null, 'Invalid PAN verification response received from server.');
    }

    return result;
  } catch (error) {
    throw toAppError(error, 'Unable to verify PAN right now. Please try again.');
  }
}

/**
 * Fetches KYC-prefilled FATCA declarations for a verified investor PAN.
 * @param pan Verified 10-character PAN string.
 * @returns Typed FATCA compliance and personal details payload.
 * @throws AppError when transport or response validation fails.
 */
export async function getClientFatcaDetails(pan: string): Promise<FatcaDetailsResponse> {
  try {
    const response = await apiClient.get<ApiSuccessEnvelope<FatcaDetailsResponse>>(
      ENDPOINTS.distributor.fatca,
      { params: { pan } },
    );
    const result = response.data.data;

    if (!result || typeof result.occupation !== 'string' || !Array.isArray(result.taxEntries)) {
      throw toAppError(null, 'Invalid FATCA response received from server.');
    }

    return result;
  } catch (error) {
    throw toAppError(error, 'Unable to fetch FATCA details. Please try again.');
  }
}
