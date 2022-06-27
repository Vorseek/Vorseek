/** @type {import("next").NextConfig} */
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
      {
        source: '/_next/image',
        has: [
          { type: 'query', key: 'w' },
          { type: 'query', key: 'q' },
          { type: 'query', key: 'url' },
        ],
        destination: '/_ipx/w_:w,q_:q/:url',
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/_next/image',
  //       has: [
  //         { type: 'query', key: 'w' },
  //         { type: 'query', key: 'q' },
  //         { type: 'query', key: 'url' },
  //       ],
  //       destination: '/_ipx/w_:w,q_:q/:url',
  //       permanent: false,
  //     },
  //   ];
  // },
  images: {
    domains: ['i.ytimg.com'],
  },
};

module.exports = nextConfig;
