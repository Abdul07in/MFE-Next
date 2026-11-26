import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const scriptSrcDirective = isDevelopment
  ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  : "script-src 'self'";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; ${scriptSrcDirective}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data: https://fonts.gstatic.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`,
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
