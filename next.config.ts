import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'joyous-giraffe-491.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'good-squid-335.convex.cloud'
      }
    ]
  },
};

export default nextConfig;
