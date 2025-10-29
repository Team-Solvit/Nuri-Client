import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!GRAPHQL_ENDPOINT) {
	throw new Error("NEXT_PUBLIC_GRAPHQL_ENDPOINT 환경 변수가 필요합니다");
}const API_BASE_URL = GRAPHQL_ENDPOINT.replace(/\/graphql$/, "");
const protocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
const WS_URL = `${protocol}://${API_BASE_URL.replace(/^https?:\/\//, "")}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(__request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
	const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' data: https:;
    connect-src 'self' ${API_BASE_URL} ${WS_URL} https:;
    font-src 'self' https: data:;
    object-src 'none';
    base-uri 'none';
    frame-ancestors 'none';
  `.replace(/\s+/g, ' ').trim();
	
	const response = NextResponse.next();
	response.headers.set('Content-Security-Policy', cspHeader);
	response.headers.set('x-nonce', nonce);
	
	return response;
}