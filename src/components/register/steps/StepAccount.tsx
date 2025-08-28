import * as S from '@/containers/register/style';
import { RegisterFormData } from '@/types/register';
import Square from '@/components/ui/button/square';

interface Props {
  form: RegisterFormData;
  onChange: (k: keyof RegisterFormData, v: any) => void;
  usernameState: { status: string; message?: string };
  onCheck: () => void;
}

export const StepAccount = ({ form, onChange, usernameState, onCheck }: Props) => {
  return (
    <>
      <S.Title>이름과 사용할 아이디를 입력해주세요.</S.Title>
      <S.FormGroup>
        <S.Label>이름</S.Label>
        <S.Input type="text" value={form.name} onChange={e => onChange('name', e.target.value)} placeholder="이름을 입력해주세요." />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>아이디</S.Label>
        <S.InputButtonGroup>
          <S.Input type="text" value={form.username} onChange={e => onChange('username', e.target.value)} placeholder="아이디를 입력해주세요." />
          <Square text={usernameState.status === 'checking' ? '확인중' : '중복확인'} onClick={onCheck} status={usernameState.status !== 'checking'} width='max-content' />
        </S.InputButtonGroup>
        {usernameState.status === 'available' && (
          <S.HelperSuccess>{usernameState.message}</S.HelperSuccess>
        )}
      </S.FormGroup>
    </>
  );
};
StepAccount.displayName = 'StepAccount';
