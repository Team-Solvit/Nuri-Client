'use client';
import { useEffect } from 'react';
import { useApollo } from '@/lib/apolloClient';
import { AuthGQL } from '@/services/auth';
import { useUserStore } from '@/store/user';
import { headersToObject } from '@/utils/headers';

export default function AuthBootstrap() {
  const client = useApollo();
  const setAuth = useUserStore(s => s.setAuth);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        let token = localStorage.getItem('AT');
        if (!token) {
          const r = await client.mutate({
            mutation: AuthGQL.MUTATIONS.REISSUE,
            fetchPolicy: 'no-cache',
          });

          const headers = headersToObject((r as any).__headers);
          token = headers['authorization']?.replace(/^Bearer\s+/i, '')
            || headers['x-access-token']
            || r?.data?.reissue
            || '';

          if (token) localStorage.setItem('AT', token);
        }

        const meRes = await client.query({
          query: AuthGQL.QUERIES.ME,
          fetchPolicy: 'no-cache',
        });

        const meHeaders = headersToObject((meRes as any).__headers);
        const rotated = meHeaders['authorization']?.replace(/^Bearer\s+/i, '') || '';
        if (rotated) localStorage.setItem('AT', rotated);

        if (!cancelled && meRes.data?.me) {
          setAuth(meRes.data.me.id, meRes.data.me.role ?? 'USER');
        }
      } catch (_) {
        // 비로그인 상태
      }
    })();

    return () => { cancelled = true; };
  }, [client, setAuth]);

  return null;
}