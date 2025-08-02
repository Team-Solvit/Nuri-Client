import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   webpack(config) {
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      net: false,
    };
    return config;
  },
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
};

export default nextConfig;
