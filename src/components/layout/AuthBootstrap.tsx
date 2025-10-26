'use client';
import { useEffect } from 'react';
import { useApollo } from '@/lib/apolloClient';
import { AuthGQL } from '@/services/auth';
import { useUserStore } from '@/store/user';
import { extractTokenFromApolloResult, getAccessToken, saveAccessToken } from '@/utils/token';

export default function AuthBootstrap() {
  const client = useApollo();
  const setAuth = useUserStore(s => s.setAuth);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const r = await client.mutate({
          mutation: AuthGQL.MUTATIONS.REISSUE,
          fetchPolicy: 'no-cache',
        });
        const headerToken = extractTokenFromApolloResult(r);
        const user = r.data?.reissue;
        if (headerToken) saveAccessToken(headerToken);
        if (user && !cancelled) setAuth(user);
      } catch {
        // 로그인 다시 시도해얍지~~!
      }
    })();

    return () => { cancelled = true; };
  }, [client, setAuth]);

  return null;
}