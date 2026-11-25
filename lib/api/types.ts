export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  requestId?: string;
}

export interface ApiErrorEnvelope {
  success: false;
  code: string;
  message: string;
  requestId?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresAt: string;
}

export interface PlatformPingResponse {
  status: 'ok';
  timestamp: string;
  source: 'server';
}
