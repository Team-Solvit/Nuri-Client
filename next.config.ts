import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		domains: ["localhost", "*"],
	},
	compiler: {
		emotion: true
	},
	reactStrictMode: true,
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
