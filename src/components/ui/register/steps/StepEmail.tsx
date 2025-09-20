import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';
import Square from '@/components/ui/button/square';
import { memo } from 'react';

interface Props {
  form: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(k: K, v: RegisterFormData[K]) => void;
  emailState: { phase: string; message?: string };
  onSend: () => void;
  onVerify: () => void;
}

export const StepEmail = memo(({ form, onChange, emailState, onSend, onVerify }: Props) => {
  return (
    <>
      <S.Title>사용할 이메일을 입력해주세요.</S.Title>
      <S.FormGroup>
        <S.Label>이메일</S.Label>
        <S.InputButtonGroup>
          <S.Input type="email" value={form.email} onChange={e => onChange('email', e.target.value)} placeholder="이메일을 입력해주세요." />
          <Square text={emailState.phase === 'sending' ? '발송중' : (emailState.phase === 'sent' || emailState.phase === 'verifying' ? '재발송' : '코드발송')} onClick={onSend} status={emailState.phase !== 'sending' && emailState.phase !== 'verifying'} width='max-content' />
        </S.InputButtonGroup>
        {emailState.phase === 'sent' && <S.HelperInfo>메일로 전송된 코드를 입력 후 인증을 완료하세요.</S.HelperInfo>}
        {emailState.phase === 'verified' && <S.HelperSuccess>{emailState.message}</S.HelperSuccess>}
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>인증 번호</S.Label>
        <S.InputButtonGroup>
          <S.Input type="text" value={form.verificationCode} onChange={e => onChange('verificationCode', e.target.value)} placeholder="인증 번호를 입력해주세요." disabled={emailState.phase === 'verified'} />
          <Square text={emailState.phase === 'verified' ? '완료' : (emailState.phase === 'verifying' ? '확인중' : '인증')} onClick={emailState.phase === 'verified' ? () => { } : onVerify} status={emailState.phase !== 'verifying' && emailState.phase !== 'sending'} width='fit-content' />
        </S.InputButtonGroup>
      </S.FormGroup>
    </>
  );
});
StepEmail.displayName = 'StepEmail';
