import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["localhost", "*"],
	},
	compiler: {
		emotion: true
	},
	reactStrictMode: true,
};

export default nextConfig;
