/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'encrypted-tbn3.gstatic.com',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn2.gstatic.com',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn1.gstatic.com',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
          },
        ],
      },
}

module.exports = nextConfig
