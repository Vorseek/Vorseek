/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/blog',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  },
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
    ];
  },
};

module.exports = nextConfig;
