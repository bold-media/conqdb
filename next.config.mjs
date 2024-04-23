import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.conqdb.com',
      },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CDN_URL : '',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
}

export default withPayload(withNextIntl(nextConfig))
