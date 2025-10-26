import { useState, useCallback } from 'react';
import { useApollo } from '@/lib/apolloClient';
import { AuthService } from '@/services/auth';
import { useAlertStore } from '@/store/alert';

export function usePasswordReset() {
  const client = useApollo();
  const alertStore = useAlertStore();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState('');

  const sendCode = useCallback(async (email: string) => {
    setLoading(true);
    try {
      await AuthService.sendMailCode(client, email);
      alertStore.success('이메일로 인증코드를 보냈습니다.');
    } catch (e) {
      alertStore.error('이메일 발송 실패');
    }
    setLoading(false);
  }, [client, alertStore]);

  const verifyCode = useCallback(async (email: string, code: string) => {
    setLoading(true);
    try {
      const t = await AuthService.verifyMailCode(client, email, code);
      setTicket(t);
      alertStore.success('인증 성공! 새 비밀번호를 입력하세요.');
      return true;
    } catch (e) {
      alertStore.error('인증코드가 올바르지 않습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [client, alertStore]);

  const changePassword = useCallback(async (email: string, password: string) => {
    if (!ticket) {
      alertStore.error('이메일 인증을 먼저 완료해주세요.');
      return false;
    }
    setLoading(true);
    try {
      await AuthService.updatePasswordWithEmail(client, email, ticket, password);
      alertStore.success('비밀번호가 성공적으로 변경되었습니다.');
      setTicket('');
      return true;
    } catch (e) {
      alertStore.error('비밀번호 변경 실패');
      return false;
    } finally {
      setLoading(false);
    }
  }, [client, alertStore, ticket]);

  return { loading, sendCode, verifyCode, changePassword, ticket };
}
