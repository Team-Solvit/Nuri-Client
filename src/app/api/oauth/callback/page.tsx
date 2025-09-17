import { Suspense } from 'react';
import OAuthCallbackClient from '@/components/layout/auth/OAuthCallbackClient';

// OAuth 콜백은 동적 파라미터 의존 → 정적 생성 방지
export const dynamic = 'force-dynamic';

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <OAuthCallbackClient />
    </Suspense>
  );
}