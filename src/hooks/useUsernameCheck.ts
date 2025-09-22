import { useState } from 'react';
import { AuthService } from '@/services/auth';
import { USERNAME_PATTERN } from '@/constants/register';
import { useAlertStore } from '@/store/alert';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export function useUsernameCheck(client: ApolloClient<NormalizedCacheObject>) {
  const alertStore = useAlertStore();
  const [state, setState] = useState<{ status: 'idle' | 'checking' | 'available' | 'taken'; message?: string }>({ status: 'idle' });

  const reset = () => setState({ status: 'idle' });

  const check = async (username: string) => {
    if (!username.trim()) { alertStore.error('아이디를 먼저 입력해주세요.'); return; }
    if (!USERNAME_PATTERN.test(username)) { alertStore.error('아이디는 영문/숫자 4~16자로 입력해주세요.'); return; }
    try {
      setState({ status: 'checking' });
      const available = await AuthService.validateUserId(client, username);
      if (available) setState({ status: 'available', message: '사용 가능한 아이디입니다.' });
      else { setState({ status: 'taken' }); alertStore.error('이미 사용 중인 아이디입니다.'); }
    } catch {
      setState({ status: 'idle' });
      alertStore.error('확인 중 오류가 발생했습니다.');
    }
  };

  return { usernameState: state, checkUsername: check, resetUsername: reset };
}
