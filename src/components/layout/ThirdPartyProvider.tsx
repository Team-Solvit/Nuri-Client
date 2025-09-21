import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { useAlertStore } from '@/store/alert';

export default function ThirdPartyProvider({ children }: { children: React.ReactNode }) {
  const { role } = useUserStore(s => s);
  const router = useRouter();
  const { error } = useAlertStore();

  useEffect(() => {
    if (role !== 'THIRD_PARTY') {
      error('접근 권한이 없습니다.');
      router.replace('/');
    }
  }, [role, router]);

  if (role !== 'THIRD_PARTY') return null;
  return children;
}