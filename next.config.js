const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seo-heist.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ansubkhan.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:locale(en|de|es|fr|it|pt)/logo.svg',
        destination: '/logo.svg',
      },
      {
        source: '/:locale(en|de|es|fr|it|pt)/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        source: '/:locale(en|de|es|fr|it|pt)/Images/:path*',
        destination: '/Images/:path*',
      },
      {
        source: '/:locale(en|de|es|fr|it|pt)/styles/:path*',
        destination: '/styles/:path*',
      },
      {
        source: '/:locale(en|de|es|fr|it|pt)/favicon.ico',
        destination: '/favicon.ico',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:locale(en|de|es|fr|it|pt)/profit',
        destination: 'https://t.me/huggingtradeofficial',
        permanent: false, // Set to true if you want a permanent redirect (status code 308)
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
