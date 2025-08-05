import {useMemo} from 'react';
import {ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject} from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
			credentials: 'include', // 쿠키 필요 시
		}),
		cache: new InMemoryCache(),
		devtools: {
			enabled: process.env.NODE_ENV === 'development',
		},
	});
}

export function initializeApollo(initialState?: NormalizedCacheObject | null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	
	if (initialState) {
		_apolloClient.cache.restore(initialState);
	}
	
	if (typeof window === 'undefined') return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;
	
	return apolloClient;
}

export function useApollo(
	initialState?: NormalizedCacheObject | null,
): ApolloClient<NormalizedCacheObject> {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}