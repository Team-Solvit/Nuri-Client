import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "1010",
				pathname: "/**",
			},
		],
	},
	compiler: {
		emotion: true
	},
	reactStrictMode: true,
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
