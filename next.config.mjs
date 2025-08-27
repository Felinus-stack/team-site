/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/team",
        destination: "/team/智能陪护",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
