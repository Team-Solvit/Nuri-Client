import type {NextConfig} from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
