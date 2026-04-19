import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:sede/admin',
        destination: '/admin/:sede',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
