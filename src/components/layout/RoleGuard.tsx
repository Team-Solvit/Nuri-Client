'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';

const ROLE_PATHS = {
  THIRD_PARTY: ['/boarding/third-party', '/meeting/third-party'],
  HOST: ['/myHouse'],
};

const ROLE_MESSAGES = {
  THIRD_PARTY: '접근 권한이 없습니다.',
  HOST: '호스트 권한이 필요합니다.',
};

export default function RoleGuard() {
  const router = useRouter();
  const pathname = usePathname();
  let userId: string | undefined;
  let role: string | undefined;
  try {
    const userStore = useUserStore.getState();
    userId = userStore.userId ?? undefined;
    role = userStore.role ?? undefined;
  } catch (e) {
    userId = undefined;
    role = undefined;
  }
  const { error } = useAlertStore();

  useEffect(() => {
    for (const [requiredRole, paths] of Object.entries(ROLE_PATHS)) {
      const isRolePath = paths.some(path => pathname?.startsWith(path));

      if (isRolePath) {
        if (!userId) {
          error('로그인이 필요한 페이지입니다.');
          router.replace('/');
          return;
        }

        if (role !== requiredRole) {
          error(ROLE_MESSAGES[requiredRole as keyof typeof ROLE_MESSAGES]);
          router.replace('/');
          return;
        }
      }
    }
  }, [role, userId, pathname, router, error]);

  return null;
}
