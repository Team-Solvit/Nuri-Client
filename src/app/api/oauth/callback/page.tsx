export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import OAuthCallbackClient from '@/components/layout/auth/OAuthCallbackClient';

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <OAuthCallbackClient />
    </Suspense>
  );
}