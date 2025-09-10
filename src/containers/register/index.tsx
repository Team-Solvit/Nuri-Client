'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as S from './style';
import Square from '@/components/ui/button/square';
import { useRouter } from 'next/navigation';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useApollo } from '@/lib/apolloClient';
import { useAlertStore } from '@/store/alert';
import { AuthService } from '@/services/auth';
import { REGISTER_STEPS } from '@/constants/register';
import { validateTerms, validateAccount, validateEmail, validatePassword, validateProfile } from '@/utils/validators/register';
import { useUsernameCheck } from '@/hooks/useUsernameCheck';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { StepTerms } from '@/components/ui/register/steps/StepTerms';
import { StepAccount } from '@/components/ui/register/steps/StepAccount';
import { StepEmail } from '@/components/ui/register/steps/StepEmail';
import { StepPassword } from '@/components/ui/register/steps/StepPassword';
import { StepProfile } from '@/components/ui/register/steps/StepProfile';
import { RegisterFormData, createInitialRegisterForm } from '@/types/register';

const steps = REGISTER_STEPS as unknown as string[];

export default function RegisterContainer() {
	const [currentStep, setCurrentStep] = useState(0);
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);
	const [formData, setFormData] = useState<RegisterFormData>(createInitialRegisterForm());
	const [error, setError] = useState<string | null>(null);
	const [touched, setTouched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [oauthId, setOauthId] = useState<string | null>(null);
	const router = useRouter();
	const client = useApollo();
	const alertStore = useAlertStore();
	const { usernameState, checkUsername, resetUsername } = useUsernameCheck(client);
	const { emailState, sendMailCode, verifyMailCode, resetEmail } = useEmailVerification(client);

	useState(() => {
		try {
			const stored = typeof window !== 'undefined' ? sessionStorage.getItem('pending_oauth_id') : null;
			if (stored) setOauthId(stored);
		} catch { }
		return undefined;
	});

	const effectiveSteps = oauthId ? steps.filter(s => s !== '비밀번호') : steps;

	const validateCurrentStep = () => {
		const stepLabel = effectiveSteps[currentStep];
		if (stepLabel === '이용약관') return validateTerms(formData as any);
		if (stepLabel === '활동정보') return validateAccount({ name: formData.name, username: formData.username, usernameChecked: usernameState.status !== 'idle', usernameAvailable: usernameState.status === 'available' });
		if (stepLabel === '인증') return validateEmail({ email: formData.email, code: formData.verificationCode, verified: emailState.phase === 'verified' });
		if (stepLabel === '비밀번호') return validatePassword({ password: formData.password, confirmPassword: formData.confirmPassword });
		if (stepLabel === '국적') return validateProfile({ nationality: formData.nationality, language: formData.language });
		return null;
	};

	const navigate = useNavigationWithProgress()
	const handleNext = async () => {
		setTouched(true);
		const validationError = validateCurrentStep();
		if (validationError) {
			setError(validationError);
			return;
		}
		setError(null);
		if (currentStep < effectiveSteps.length - 1) {
			setCompletedSteps([...completedSteps, currentStep]);
			setCurrentStep(currentStep + 1);
			setTouched(false);
		} else {
			if (loading) return;
			setLoading(true);
			try {
				if (oauthId) {
					await AuthService.oauthSignUp(client, {
						oauthId,
						id: formData.username,
						email: formData.email,
						country: formData.nationality,
						language: formData.language,
						emailVerifyTicket: emailState.ticket,
						userAgreement: {
							agreedTermsOfService: formData.terms1,
							agreedPrivacyCollection: formData.terms2,
							agreedPrivacyThirdParty: formData.terms3,
							// 외부 본인인증 비사용: 서버 변경되면 지우기
							agreedIdentityAgencyTerms: false,
							agreedIdentityPrivacyDelegate: false,
							agreedIdentityUniqueInfo: false,
							agreedIdentityProviderTerms: false
						},
					});
					alertStore.success('회원가입이 완료되었습니다.');
					sessionStorage.removeItem('pending_oauth_id');
				} else {
					await AuthService.localSignUp(client, {
						id: formData.username,
						password: formData.password,
						name: formData.name,
						email: formData.email,
						country: formData.nationality,
						language: formData.language,
						emailVerifyTicket: emailState.ticket,
						userAgreement: {
							agreedTermsOfService: formData.terms1,
							agreedPrivacyCollection: formData.terms2,
							agreedPrivacyThirdParty: formData.terms3,
							// 외부 본인인증 비사용: 서버 변경되면 지우기
							agreedIdentityAgencyTerms: false,
							agreedIdentityPrivacyDelegate: false,
							agreedIdentityUniqueInfo: false,
							agreedIdentityProviderTerms: false
						},
					});
					alertStore.success('회원가입이 완료되었습니다.');
				}
				navigate('/register/success');
			} catch (e: any) {
				alertStore.error(e?.message || '회원가입에 실패했습니다.');
			} finally {
				setLoading(false);
			}
		}
	};

	const handleEdit = (stepIndex: number) => {
		setCurrentStep(stepIndex);
		setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
	};

	const onChangeField = <K extends keyof RegisterFormData>(key: K, value: RegisterFormData[K]) => {
		setFormData(prev => {
			const updated = { ...prev, [key]: value };
			if (key === 'username') { resetUsername(); }
			if (key === 'email') { resetEmail(); }
			if (touched) {
				const validationError = validateCurrentStep();
				if (!validationError) setError(null);
			}
			return updated;
		});
	};

	const handleUsernameCheck = () => { checkUsername(formData.username); };
	const handleSendMailCode = () => { sendMailCode(formData.email); };
	const handleVerifyMailCode = () => { verifyMailCode(formData.email, formData.verificationCode); };

	const renderStepContent = () => {
		const stepLabel = effectiveSteps[currentStep];
		switch (stepLabel) {
			case '이용약관':
				return <StepTerms form={formData} onChange={onChangeField} />;
			case '활동정보':
				return <StepAccount form={formData} onChange={onChangeField} usernameState={usernameState} onCheck={handleUsernameCheck} />;
			case '인증':
				return <StepEmail form={formData} onChange={onChangeField} emailState={emailState} onSend={handleSendMailCode} onVerify={handleVerifyMailCode} />;
			case '비밀번호':
				return <StepPassword form={formData} onChange={onChangeField} />;
			case '국적':
				return <StepProfile form={formData} onChange={onChangeField} />;
			default:
				return null;
		}
	};

	return (
		<S.Wrapper>
			<S.Header>
				<S.Progress>
					<S.ProgressLine progress={completedSteps.length} />
					{effectiveSteps.map((label, idx) => (
						<S.Step key={idx}>
							<S.StepCircle
								completed={completedSteps.includes(idx)}
								current={idx === currentStep}
							>
								{completedSteps.includes(idx)
									? <Image src="icons/check.svg" alt="완료" width={18} height={18} />
									: idx + 1}
							</S.StepCircle>
							<S.StepLabel
								current={idx === currentStep}
								completed={completedSteps.includes(idx)}
							>
								{label}
							</S.StepLabel>
							{completedSteps.includes(idx) && (
								<S.EditButton onClick={() => handleEdit(idx)}>수정</S.EditButton>
							)}
						</S.Step>
					))}
				</S.Progress>
			</S.Header>

			<S.Content>
				{renderStepContent()}
				{touched && error && <S.ErrorMessage>{error}</S.ErrorMessage>}
				<S.ButtonGroup>
					{currentStep === 0 && (
						<Square text='돌아가기' onClick={() => router.back()} status={false} width="100%" />
					)}
					<Square
						text={currentStep === effectiveSteps.length - 1 ? (loading ? '가입 중...' : '가입완료') : '다음'}
						onClick={handleNext}
						status={!loading}
						width="100%"
					/>
				</S.ButtonGroup>
			</S.Content>
		</S.Wrapper>
	);
}