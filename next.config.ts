import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wwknvslynmfwuybicvlr.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.saifabdelfattah.net',
      },
    ],
  },
  async redirects() {
    return []
  },
}

export default nextConfig
