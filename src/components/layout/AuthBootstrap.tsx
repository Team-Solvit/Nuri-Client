'use client';
import { useEffect, useRef } from 'react';
import { useApollo } from '@/lib/apolloClient';
import { AuthGQL } from '@/services/auth';
import { useUserStore } from '@/store/user';
import { extractTokenFromApolloResult, saveAccessToken, getAccessToken, isTokenExpired } from '@/utils/token';
import { useLoginModalStore } from '@/store/loginModal';

export default function AuthBootstrap() {
  const client = useApollo();
  const setAuth = useUserStore(s => s.setAuth);
  const clear = useUserStore(s => s.clear);
  const { open } = useLoginModalStore();
  const isRefreshing = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      if (isRefreshing.current) return;

      const existingToken = getAccessToken();

      if (!existingToken) {
        return;
      }

      if (!isTokenExpired(existingToken)) {
        return;
      }
      isRefreshing.current = true;

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
        localStorage.removeItem('AT');
        localStorage.removeItem('nuri-user');
        clear();
      } finally {
        isRefreshing.current = false;
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => checkAuth());
    } else {
      setTimeout(checkAuth, 0);
    }

    return () => { cancelled = true; };
  }, [client, setAuth, clear, open]);

  return null;
}