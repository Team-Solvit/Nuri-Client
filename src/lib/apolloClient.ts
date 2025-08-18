import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthGQL } from '@/services/auth';
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, ApolloLink, from } from '@apollo/client';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {

	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
		credentials: 'include',
		fetch: async (uri, options) => {
			const res = await fetch(uri, options);
			return res;
		},
	});

	const captureHeadersLink = new ApolloLink((operation, forward) => {
		return forward(operation).map((result) => {
			const { response } = operation.getContext() as { response?: Response };
			if (response) {
				(result as any).__headers = response.headers;
				(result as any).__status = response.status;
			}
			return result;
		});
	});

	const authLink = setContext((_, { headers }) => {
		const token = typeof window !== 'undefined' ? localStorage.getItem('AT') : null;
		return {
			headers: {
				...headers,
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		};
	});

	const errorLink = onError(({ graphQLErrors, operation, forward, networkError }) => {
		const unauth =
			(graphQLErrors ?? []).some(e => e.extensions?.code === 'UNAUTHENTICATED') ||
			(networkError as any)?.statusCode === 401;

		if (!unauth) return;

		return forward(operation).flatMap({
			next: () => { /* no-op */ },
			error: async () => {
				return operation.getContext().client
					.mutate({ mutation: AuthGQL.MUTATIONS.REISSUE, fetchPolicy: 'no-cache' })
					.then((r) => {
						const token = r?.data?.reissue as string | undefined;
						if (token) localStorage.setItem('AT', token);
						const prevHeaders = operation.getContext().headers ?? {};
						operation.setContext({
							headers: { ...prevHeaders, Authorization: `Bearer ${token}` },
						});
						return forward(operation);
					})
					.catch(() => {
						localStorage.removeItem('AT');
						throw networkError;
					});
			},
		} as any);
	});

	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([errorLink, authLink, captureHeadersLink, httpLink]),
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