import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	compiler: {
		emotion: true
	},
	reactStrictMode: true,
};

export default nextConfig;
