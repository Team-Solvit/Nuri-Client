import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';
import { memo } from 'react';

interface Props { form: RegisterFormData; onChange: (k: keyof RegisterFormData, v: any) => void; }
export const StepPassword = memo(({ form, onChange }: Props) => {
  return (
    <>
      <S.Title>사용할 비밀번호를 입력해주세요.</S.Title>
      <S.FormGroup>
        <S.Label>비밀번호</S.Label>
        <S.Input type="password" value={form.password} onChange={e => onChange('password', e.target.value)} placeholder="비밀번호를 입력해주세요." />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>비밀번호 재입력</S.Label>
        <S.Input type="password" value={form.confirmPassword} onChange={e => onChange('confirmPassword', e.target.value)} placeholder="비밀번호를 다시 한 번 입력해주세요." />
      </S.FormGroup>
    </>
  );
});
StepPassword.displayName = 'StepPassword';
