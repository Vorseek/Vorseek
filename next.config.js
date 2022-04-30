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
      {
        source: '/proxy/facebook/:path*',
        destination: 'https://connect.facebook.net/:path*',
      },
      {
        source: '/proxy/google/:path*',
        destination: 'https://www.googletagmanager.com/:path*',
      },
    ];
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
