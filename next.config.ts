import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() { return [{source: '/:path*', headers: [
    {key: 'X-Content-Type-Options', value: 'nosniff'},
    {key: 'X-Frame-Options', value: 'DENY'},
    {key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'"},
    {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
    {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
  ]}]; },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false
  },
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/arpai-core/**']
    };
    return config;
  }
};

export default nextConfig;

