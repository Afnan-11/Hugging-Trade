/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Define allowed external domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    
  },
}

module.exports = nextConfig