import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { colors, radius, fontSizes } from '@/styles/theme';
import Square from '@/components/ui/button/square';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mq } from '@/styles/media';
import { useApollo } from '@/lib/apolloClient';
import { useAlertStore } from '@/store/alert';
import { useLoginModalStore } from '@/store/loginModal';
import { useUserStore } from '@/store/user';
import { AuthGQL, AuthService } from '@/services/auth';
import { gql } from '@apollo/client';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import { validatePassword } from '@/utils/validators/register';

const UPDATE_PASSWORD = gql`
  mutation UpdatePasswordWithEmail($input: PasswordUpdateInput!) {
    updatePasswordWithEmail(passwordUpdateInput: $input)
  }
`;

export default function Login() {
	const router = useRouter();
	const [step, setStep] = useState<'login' | 'find-email' | 'find-reset'>("login");
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [pw, setPw] = useState("");
	const [pw2, setPw2] = useState("");
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [codeSent, setCodeSent] = useState(false);
	
	const client = useApollo();
	const alertStore = useAlertStore();
	const loginModal = useLoginModalStore();
	const setAuth = useUserStore(s => s.setAuth);
	const setToken = useUserStore(s=>s.setToken)
	
	const {
		loading: findLoading,
		sendCode: handleSendCode,
		verifyCode: handleVerifyCode,
		changePassword: handleChangePassword,
		ticket: findTicket,
	} = usePasswordReset();
	
	const handleLogin = useCallback(async () => {
		if (loading) return;
		if (!id.trim() || !password.trim()) {
			alertStore.error('아이디와 비밀번호를 입력해주세요.');
			return;
		}
		setLoading(true);
		try {
			const { user, headers, status } = await AuthService.localLogin(
				client,
				{ id: id.trim(), password }
			);
			
			const headerTokenRaw =
				headers['authorization'] || headers['x-access-token'] || '';
			const headerToken = headerTokenRaw.replace(/^Bearer\s+/i, '');
			
			if (!headerToken) {
				throw new Error(`토큰이 응답에 없습니다. status=${status ?? 'N/A'}`);
			}
			
			localStorage.setItem('AT', headerToken);
			
			if (!user) {
				throw new Error('로그인 유저 정보가 없습니다.');
			}
			setAuth(user);
			setToken(headerToken)
			alertStore.success('로그인 성공');
			loginModal.close();
		} catch (e: any) {
			alertStore.error(e?.message || '로그인 실패');
		} finally {
			setLoading(false);
		}
	}, [id, password, client, alertStore, loginModal, loading, setAuth]);
	
	const handleSocialLogin = useCallback(async (provider: 'kakao' | 'google' | 'facebook' | 'tiktok') => {
		try {
			sessionStorage.setItem('oauth_provider', provider);
			
			const { data } = await client.query({
				query: AuthGQL.QUERIES.GET_SOCIAL_URL,
				variables: { provider },
				fetchPolicy: 'no-cache'
			});
			
			if (data?.getOAuth2Link) {
				window.location.href = data.getOAuth2Link;
			} else {
				alertStore.error('소셜 로그인 URL을 가져올 수 없습니다.');
				sessionStorage.removeItem('oauth_provider');
			}
		} catch (error: any) {
			alertStore.error(error?.message || '소셜 로그인 연결에 실패했습니다.');
			sessionStorage.removeItem('oauth_provider');
		}
	}, [client, alertStore]);
	
	// sendCode 래핑해서 발송 후 codeSent true로
	const handleSendCodeAndSet = useCallback(async (email: string) => {
		await handleSendCode(email);
		setCodeSent(true);
	}, [handleSendCode]);
	
	// 인증 성공 시 codeSent false로 초기화
	const handleVerifyCodeAndSet = useCallback(async (email: string, code: string) => {
		const ok = await handleVerifyCode(email, code);
		if (ok) {
			setStep('find-reset');
			setCodeSent(false);
		}
	}, [handleVerifyCode]);
	
	return (
		<Wrapper>
			<Image src="/logo.svg" alt="로고" width={80} height={80} priority />
			{step === 'login' && (
				<>
					<FormGroup>
						<Label>아이디</Label>
						<Input
							type="text"
							placeholder="아이디 또는 이메일을 입력해주세요."
							value={id}
							onChange={e => setId(e.target.value)}
							onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
						/>
					</FormGroup>
					<FormGroup>
						<Label>비밀번호</Label>
						<Input
							type="password"
							placeholder="비밀번호를 입력해주세요."
							value={password}
							onChange={e => setPassword(e.target.value)}
							onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
						/>
						<Hint>
							<Left>
								계정이 없으신가요? <SignUp onClick={() => {
								router.push('/register');
							}}>회원가입 하기</SignUp>
							</Left>
							<Right onClick={() => setStep('find-email')}>비밀번호를 잊으셨나요?</Right>
						</Hint>
					</FormGroup>
					<Square
						text={loading ? '로그인 중...' : '로그인'}
						onClick={handleLogin}
						status={!!id && !!password && !loading}
						width='100%'
					/>
					<SocialOther>또는</SocialOther>
					<SocialList>
						<Image src="/login/kakao.svg" alt="카카오 로그인" width={56} height={56} onClick={() => handleSocialLogin('kakao')} />
						<Image src="/login/tiktok.svg" alt="틱톡 로그인" width={56} height={56} onClick={() => handleSocialLogin('tiktok')} />
						<Image src="/login/facebook.svg" alt="페이스북 로그인" width={56} height={56} onClick={() => handleSocialLogin('facebook')} />
						<Image src="/login/google.svg" alt="구글 로그인" width={56} height={56} onClick={() => handleSocialLogin('google')} />
					</SocialList>
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
							{!codeSent ? (
								<Square text='발송' onClick={() => handleSendCodeAndSet(email)} status={!findLoading} width='fit-content' />
							) : (
								<Square text='인증' onClick={() => handleVerifyCodeAndSet(email, code)} status={!findLoading} width='fit-content' />
							)}
						</InputRow>
					</FormGroup>
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
					<Square text={findLoading ? '변경 중...' : '비밀번호 재설정'} onClick={async () => {
						const err = validatePassword({ password: pw, confirmPassword: pw2 });
						if (err) {
							alertStore.error(err);
							return;
						}
						const ok = await handleChangePassword(email, pw);
						if (ok) setStep('login');
					}} status={!findLoading} width='100%' />
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
  padding: 1.5rem;

  ${mq.mobile} {
    width: 90vw;
    border-radius: ${radius.md};
  }
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
  margin-top: 0.5rem;
  font-size: ${fontSizes.Small};
  color: ${colors.gray};
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

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

  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  color: ${colors.gray};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialOther = styled.div`
  margin-top: 1rem;
  color: ${colors.gray};
  font-size: ${fontSizes.Small};
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${colors.gray};
    display: block;
  }
`;

const SocialList = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;

  img {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.03);
    }
  }
`;