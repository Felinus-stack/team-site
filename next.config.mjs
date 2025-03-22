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
        destination: "/team/RT14e",
        permanent: true,
      },
      {
        source: "/bolid",
        destination: "/bolid/RT12e",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
