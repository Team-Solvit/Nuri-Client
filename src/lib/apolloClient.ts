import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthGQL } from '@/services/auth';
import { withRefreshLock, extractTokenFromApolloResult, saveAccessToken } from '@/utils/token';
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, ApolloLink, from, fromPromise, Observable } from '@apollo/client';

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

	const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
		const unauth =
			(graphQLErrors ?? []).some(e => e.extensions?.code === 'UNAUTHENTICATED') ||
			(networkError as any)?.statusCode === 401;

		if (!unauth) return;

		return fromPromise(
			withRefreshLock(async () => {
				const r = await apolloClient.mutate({
					mutation: AuthGQL.MUTATIONS.REISSUE,
					fetchPolicy: 'no-cache',
				});
				const newToken = extractTokenFromApolloResult(r);
				if (newToken) saveAccessToken(newToken);
				return newToken ?? null;
			})
		).flatMap((newToken) => {
			if (!newToken) {
				return new Observable<never>((observer) => {
					observer.complete();
				});
			}

			const prev = operation.getContext().headers ?? {};
			operation.setContext({
				headers: { ...prev, Authorization: `Bearer ${newToken}` },
			});

			return forward(operation);
		});
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