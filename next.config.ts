import type { NextConfig } from "next";


const nextConfig: NextConfig = {
	output: "standalone",
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
		emotion: true,
	},
	reactStrictMode: true,
	typescript: { ignoreBuildErrors: true },
	
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY", // 클릭재킹 방지
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff", // MIME 타입 스니핑 방지
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin", // 리퍼러 최소화
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), interest-cohort=()", // 불필요한 권한 차단
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains"
					},
				],
			},
		];
	},
};

export default nextConfig;