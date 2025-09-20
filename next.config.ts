import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "search.pstatic.net",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "1010",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.solvit-nuri.com",
				pathname: "/file/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "k.kakaocdn.net",
			},
			{
				protocol: "https",
				hostname: "p16-sign.tiktokcdn-us.com",
			},
			{
				protocol: "https",
				hostname: "p16-sign-va.tiktokcdn.com",
			},
			{
				protocol: "https",
				hostname: "platform-lookaside.fbsbx.com",
			},
			{
				protocol: "https",
				hostname: "scontent.xx.fbcdn.net",
			},
			{
				protocol: "https",
				hostname: "example.com",
				pathname: "/profiles/**",
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
