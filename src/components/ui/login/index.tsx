

import styled from '@emotion/styled';
import { useState } from 'react';
import { colors, radius, fontSizes } from '@/styles/theme';
import Square from '@/components/ui/button/square';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'find-email' | 'find-reset'>("login");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  return (
    <Wrapper>
      <Image src="/logo.svg" alt="로고" width={80} height={80} priority />

      {step === 'login' && (
        <>
          <FormGroup>
            <Label>아이디</Label>
            <Input type="text" placeholder="아이디 또는 이메일을 입력해주세요." />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호를 입력해주세요." />
            <Hint>
              <Left>
                계정이 없으신가요? <SignUp onClick={() => { router.push('/register'); }}>회원가입 하기</SignUp>
              </Left>
              <Right onClick={() => setStep('find-email')}>비밀번호를 잊으셨나요?</Right>
            </Hint>
          </FormGroup>
          <Square text='로그인' onClick={() => { }} status={true} width='100%' />
        </>
      )}

      {step === 'find-email' && (
        <>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>인증 번호</Label>
            <InputRow>
              <Input
                type="text"
                placeholder="인증 번호를 입력해주세요."
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ flex: 1 }}
              />
              <Square text='인증' onClick={() => { }} status={true} width='6vw' />
            </InputRow>
          </FormGroup>
          <Square text='다음' onClick={() => setStep('find-reset')} status={true} width='100%' />
        </>
      )}

      {step === 'find-reset' && (
        <>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 재입력</Label>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={pw2}
              onChange={e => setPw2(e.target.value)}
            />
          </FormGroup>
          <Square text='비밀번호 재설정' onClick={() => setStep('login')} status={true} width='100%' />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 25vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${fontSizes.H4};
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.25rem;
  border: 1.5px solid ${colors.gray};
  border-radius: ${radius.md};
  font-size: ${fontSizes.Body};
  background: #fff;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray};
    font-size: ${fontSizes.Small};
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Hint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const SignUp = styled.span`
  color: #7f96ff;
  font-weight: 600;
  cursor: pointer;
`;

const Right = styled.div`
  color: ${colors.gray};
  cursor: pointer;
`;