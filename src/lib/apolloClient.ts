import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthGQL } from '@/services/auth';
<<<<<<< Updated upstream
import { extractTokenFromApolloResult, saveAccessToken, getAccessToken, isTokenExpired, clearAccessToken } from '@/utils/token';
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, ApolloLink, from, fromPromise } from '@apollo/client';
=======
import { withRefreshLock, extractTokenFromApolloResult, saveAccessToken, isTokenExpired, refreshAccessToken, getAccessToken } from '@/utils/token';
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, ApolloLink, from, fromPromise, Observable } from '@apollo/client';
>>>>>>> Stashed changes

let apolloClient: ApolloClient<NormalizedCacheObject>;
let refreshPromise: Promise<string | null> | null = null;

// 토큰 갱신 함수
async function refreshToken(): Promise<string | null> {
  // 이미 갱신 중이면 같은 Promise 반환
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      console.log('🔄 Attempting to refresh token...');
      
      const r = await apolloClient.mutate({
        mutation: AuthGQL.MUTATIONS.REISSUE,
        fetchPolicy: 'no-cache',
        context: { credentials: 'include' },
      });

      const newToken = extractTokenFromApolloResult(r);
      
      if (newToken) {
        saveAccessToken(newToken);
        console.log('✅ Token refreshed successfully');
        return newToken;
      }
      
      throw new Error('No token received from reissue');
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      
      // Reissue 실패 시 로그아웃 처리
      clearAccessToken();
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth-failed'));
      }
      
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'include',
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

  // 요청 전에 토큰 체크 및 갱신
  const authLink = setContext(async (operation, { headers }) => {
    // Reissue 요청은 토큰 없이
    if (operation.operationName === 'Reissue') {
      return { headers };
    }

<<<<<<< Updated upstream
    const token = getAccessToken();
    
    // 토큰이 없으면 그냥 진행
    if (!token) {
      return { headers };
    }

    // 토큰이 만료되었거나 곧 만료될 예정이면 Reissue 시도
    if (isTokenExpired(token)) {
      console.log('⚠️ Token expired or expiring soon, attempting refresh...');
      const newToken = await refreshToken();
      
      // Reissue 실패 시 (newToken === null) 토큰 없이 진행
      return {
        headers: {
          ...headers,
          ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
        },
      };
    }
=======
	const authLink = setContext(async (operation, { headers }) => {
		if (operation.operationName === 'Reissue') {
			return { headers };
		}

		let token = getAccessToken();

		if (token && isTokenExpired(token)) {
			token = await withRefreshLock(refreshAccessToken);
		}

		return {
			headers: {
				...headers,
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		};
	});
>>>>>>> Stashed changes

    // 토큰이 유효하면 그대로 사용
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  // 에러 처리 (백업용 - 서버에서 401이 오는 경우)
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    
    const isUnauth =
      (graphQLErrors ?? []).some(e => e.extensions?.code === 'UNAUTHENTICATED') ||
      (networkError as any)?.statusCode === 401;
console.log('🔔 Error link triggered', isUnauth, networkError, graphQLErrors);
    if (!isUnauth) return;

    console.log('⚠️ Received 401 error, attempting refresh...');

    return fromPromise(
      refreshToken().then(newToken => {
        if (!newToken) {
          // Reissue 실패 - 로그아웃 처리됨
          return null;
        }
        
        const oldHeaders = operation.getContext().headers ?? {};
        operation.setContext({
          headers: {
            ...oldHeaders,
            Authorization: `Bearer ${newToken}`,
          },
        });
        
        return newToken;
      })
    ).flatMap(newToken => {
      if (!newToken) {
        // Reissue 실패 시 요청 중단
        return forward(operation);
      }
      
      // Reissue 성공 시 재시도
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