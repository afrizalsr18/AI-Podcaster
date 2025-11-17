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
      },
      {
        protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ]
  },
};

export default nextConfig;
