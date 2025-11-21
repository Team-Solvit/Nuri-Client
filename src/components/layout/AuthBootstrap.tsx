'use client';
import { useEffect, useRef } from 'react';
import { useApollo } from '@/lib/apolloClient';
import { AuthGQL } from '@/services/auth';
import { useUserStore } from '@/store/user';
import { extractTokenFromApolloResult, saveAccessToken, getAccessToken, isTokenExpired, clearAccessToken } from '@/utils/token';

export default function AuthBootstrap() {
  const client = useApollo();
  const setAuth = useUserStore(s => s.setAuth);
  const clear = useUserStore(s => s.clear);
  const hasChecked = useRef(false);

  useEffect(() => {
    // 한 번만 실행
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkAuth = async () => {
      const token = getAccessToken();

      // 토큰이 없으면 그냥 종료
      if (!token) {
        return;
      }

      // 토큰이 유효하면 그냥 종료
      if (!isTokenExpired(token)) {
        return;
      }

      // 토큰이 만료됨 - Reissue 시도
      console.log('⚠️ Initial token expired, attempting reissue...');
      
      try {
        const r = await client.mutate({
          mutation: AuthGQL.MUTATIONS.REISSUE,
          fetchPolicy: 'no-cache',
        });
        
        const newToken = extractTokenFromApolloResult(r);
        const user = r.data?.reissue;
        
        if (newToken) {
          saveAccessToken(newToken);
          if (user) setAuth(user);
          console.log('✅ Token refreshed successfully on bootstrap');
        } else {
          throw new Error('No token received from reissue');
        }
      } catch (error) {
        console.error('❌ Bootstrap reissue failed, logging out:', error);
        
        // Reissue 실패 시 로그아웃
        clearAccessToken();
        clear();
        
        // 로그인 모달 열기
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-failed'));
        }
      }
    };

    checkAuth();
  }, [client, setAuth, clear]);

  return null;
}