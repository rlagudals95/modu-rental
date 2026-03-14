import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/core', '@repo/analytics', '@repo/db']
};

export default nextConfig;
