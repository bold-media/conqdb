import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const policies = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.conqdb.com'],
  'child-src': ["'self'"],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'http://fonts.googleapis.com',
    'https://fonts.googleapis.com',
    'https://cdn.conqdb.com',
    'https://fonts.gstatic.com/',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https://cdn.discordapp.com',
    'https://cdn.conqdb.com',
    'https://cdn.jsdelivr.net/',
  ],
  'font-src': [
    "'self'",
    'https://cdn.conqdb.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com/',
  ],
  'frame-src': ["'self'"],
  'connect-src': ["'self'"],
}

const ContentSecurityPolicy = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')

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
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  output: 'standalone',

  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }

    // headers.push({
    //   source: '/(.*)',
    //   headers: [
    //     {
    //       key: 'Content-Security-Policy',
    //       value: ContentSecurityPolicy,
    //     },
    //   ],
    // })

    return headers
  },
}

export default withPayload(withNextIntl(nextConfig))
