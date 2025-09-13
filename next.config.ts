import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // 모든 호스트 허용
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
