import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'q0rddlmz68grwzup.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
