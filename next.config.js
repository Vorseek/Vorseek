/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
