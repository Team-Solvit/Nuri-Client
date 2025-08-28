'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApollo } from '@/lib/apolloClient';
import { useAlertStore } from '@/store/alert';
import { useUserStore } from '@/store/user';
import { AuthService } from '@/services/auth';
import { decodeJWT } from '@/utils/jwt';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const client = useApollo();
  const alertStore = useAlertStore();
  const setAuth = useUserStore(s => s.setAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`OAuth 인증 실패: ${error}`);
        }

        if (!code) {
          throw new Error('인증 코드가 없습니다.');
        }

        let provider = 'kakao';

        const storedProvider = sessionStorage.getItem('oauth_provider');
        if (storedProvider) {
          provider = storedProvider;
          sessionStorage.removeItem('oauth_provider');
        }

        console.log('OAuth 콜백 처리:', { code: code, provider });

        const { response, headers, status } = await AuthService.oauthLogin(client, {
          code,
          provider
        });

        if (!response) {
          throw new Error('OAuth 로그인 응답이 없습니다.');
        }

        if (response.isNewUser && response.oauthId) {
          alertStore.success('신규 사용자입니다. 추가 정보를 입력해주세요.');
          sessionStorage.setItem('pending_oauth_id', response.oauthId);
          router.push('/register');
          return;
        }

        const headerTokenRaw = headers['authorization'] || headers['x-access-token'] || '';
        const headerToken = headerTokenRaw.replace(/^Bearer\s+/i, '');

        if (!headerToken) {
          throw new Error(`토큰이 응답에 없습니다. status=${status ?? 'N/A'}`);
        }

        const decodedToken = decodeJWT(headerToken);
        const role = decodedToken?.role || 'USER';
        const userId = decodedToken?.sub || decodedToken?.id || 'unknown';

        localStorage.setItem('AT', headerToken);
        setAuth(userId, role);

        alertStore.success('로그인 성공');
        router.push('/');
      } catch (error: any) {
        console.error('OAuth 콜백 처리 실패:', error);
        alertStore.error(error?.message || '로그인에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, []);

  if (loading) {
    return (
      <div>로딩중...</div>
    );
  }

  return null;
}