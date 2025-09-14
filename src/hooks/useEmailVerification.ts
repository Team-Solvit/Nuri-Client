import { useState } from 'react';
import { AuthService } from '@/services/auth';
import { EMAIL_PATTERN } from '@/constants/register';
import { useAlertStore } from '@/store/alert';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export function useEmailVerification(client: ApolloClient<NormalizedCacheObject>) {
  const alertStore = useAlertStore();
  const [state, setState] = useState<{ phase: 'idle' | 'sending' | 'sent' | 'verifying' | 'verified'; ticket?: string; message?: string }>({ phase: 'idle' });

  const reset = () => setState({ phase: 'idle' });

  const sendCode = async (email: string) => {
    if (!email.trim()) { alertStore.error('이메일을 입력해주세요.'); return; }
    if (!EMAIL_PATTERN.test(email)) { alertStore.error('올바른 이메일 형식이 아닙니다.'); return; }
    try {
      setState(p => ({ ...p, phase: 'sending' }));
      await AuthService.sendMailCode(client, email);
      setState({ phase: 'sent', message: '인증코드를 발송했습니다.' });
      alertStore.success('인증코드를 발송했습니다. 메일을 확인하세요.');
    } catch (e: any) {
      setState({ phase: 'idle' });
      alertStore.error(e?.message || '인증코드 발송 실패');
    }
  };

  const verifyCode = async (email: string, code: string) => {
    if (state.phase !== 'sent') { alertStore.error('먼저 인증코드를 발송해주세요.'); return; }
    if (!code.trim()) { alertStore.error('인증 코드를 입력해주세요.'); return; }
    try {
      setState(p => ({ ...p, phase: 'verifying' }));
      const ticket = await AuthService.verifyMailCode(client, email, code);
      if (ticket) {
        setState({ phase: 'verified', ticket, message: '이메일이 인증되었습니다.' });
        alertStore.success('이메일 인증 완료');
      } else {
        setState({ phase: 'sent' });
        alertStore.error('인증 실패');
      }
    } catch (e: any) {
      setState({ phase: 'sent' });
      alertStore.error(e?.message || '인증 실패');
    }
  };

  return { emailState: state, sendMailCode: sendCode, verifyMailCode: verifyCode, resetEmail: reset };
}
