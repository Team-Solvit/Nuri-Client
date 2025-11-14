'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { useLoginModalStore } from '@/store/loginModal';
import { useAlertStore } from '@/store/alert';

const PROTECTED_PATHS = [
  '/alert',
  '/creating',
  '/message',
  '/meetings/',
  '/profile',
  '/setting',
];

export default function AuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useUserStore();
  const { open } = useLoginModalStore();
  const { error } = useAlertStore();

  useEffect(() => {
    const isProtectedPath = PROTECTED_PATHS.some(path => pathname?.startsWith(path));

    if (isProtectedPath && !userId) {
      error('로그인이 필요한 페이지입니다.');
      open();
      router.replace('/');
    }
  }, [pathname, userId, router, open, error]);

  return null;
}
