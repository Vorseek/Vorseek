/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/blog',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  },
  headers: async () => [
    {
      source: '/ru/coin-price-chart',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
    {
      source: '/serverside',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
  ],
  async rewrites() {
    return [
      {
        source: '/:locale/blog/:path*',
        destination: '/:locale/:path*',
      },
      {
        source: '/blog/:path*',
        destination: '/:path*',
      },
      {
        source: '/proxy/facebook/:path*',
        destination: 'https://connect.facebook.net/:path*',
      },
    ];
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
