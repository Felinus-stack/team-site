/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/team",
        destination: "/ch/team/智能陪护",
        permanent: true,
      },
      {
        source: "/",
        destination: "/ch",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/ch/projects",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/ch/about",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/ch/contact", 
        permanent: false,
      },
      {
        source: "/news",
        destination: "/ch/news",
        permanent: false,
      },
      {
        source: "/partners",
        destination: "/ch/partners",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
