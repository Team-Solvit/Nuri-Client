import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
};

export default nextConfig;
