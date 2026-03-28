import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.toolsrepository.com',
      },
    ],
  },
};

export default nextConfig;
