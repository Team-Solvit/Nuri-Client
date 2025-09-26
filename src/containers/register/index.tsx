'use client';

import { useState, useEffect } from 'react';
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
	const [touched, setTouched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [oauthId, setOauthId] = useState<string | null>(null);
	const router = useRouter();
	const client = useApollo();
	const alertStore = useAlertStore();
	const { usernameState, checkUsername, resetUsername } = useUsernameCheck(client);
	const { emailState, sendMailCode, verifyMailCode, resetEmail } = useEmailVerification(client);

	useEffect(() => {
		try {
			const stored = typeof window !== 'undefined' ? sessionStorage.getItem('pending_oauth_id') : null;
			if (stored) setOauthId(stored);
		} catch { }
	}, []);

	const effectiveSteps = oauthId ? steps.filter(s => s !== '비밀번호') : steps;

	const validateCurrentStep = () => {
		const stepLabel = effectiveSteps[currentStep];
		if (stepLabel === '이용약관') return validateTerms(formData);
		if (stepLabel === '활동정보') return validateAccount({ name: formData.name, username: formData.username, usernameChecked: usernameState.status !== 'idle', usernameAvailable: usernameState.status === 'available' });
		if (stepLabel === '인증') return validateEmail({ email: formData.email, code: formData.verificationCode, verified: emailState.phase === 'verified' });
		if (stepLabel === '비밀번호') return validatePassword({ password: formData.password, confirmPassword: formData.confirmPassword });
		if (stepLabel === '국적') return validateProfile({ nationality: formData.nationality, language: formData.language });
		return null;
	};

	// 현재 단계까지의 완료된 단계들만 필터링 (체크 표시용)
	const getVisibleCompletedSteps = () => {
		return completedSteps.filter(step => step < currentStep);
	};

	// 프로그레스 바 계산 (현재 단계까지 다 채우기)
	const getProgressValue = () => {
		return currentStep;
	};

	const navigate = useNavigationWithProgress()
	const handleNext = async () => {
		setTouched(true);
		const validationError = validateCurrentStep();
		if (validationError) {
			alertStore.error(validationError);
			return;
		}
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
		// 편집하려는 단계 이후의 완료 상태는 제거하지 않음 (데이터는 유지)
		// UI에서만 현재 단계 이후는 보이지 않도록 함
	};

	const onChangeField = <K extends keyof RegisterFormData>(key: K, value: RegisterFormData[K]) => {
		setFormData(prev => {
			const updated = { ...prev, [key]: value };
			if (key === 'username') { resetUsername(); }
			if (key === 'email') { resetEmail(); }
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

	const visibleCompletedSteps = getVisibleCompletedSteps();

	return (
		<S.Wrapper>
			<S.Header>
				<S.Progress>
					<S.ProgressLine progress={getProgressValue()} totalSteps={effectiveSteps.length} />
					{effectiveSteps.map((label, idx) => (
						<S.Step key={idx}>
							<S.StepCircle
								completed={visibleCompletedSteps.includes(idx)}
								current={idx === currentStep}
							>
								{visibleCompletedSteps.includes(idx)
									? <Image src="icons/check.svg" alt="완료" width={18} height={18} />
									: idx + 1}
							</S.StepCircle>
							<S.StepLabel
								current={idx === currentStep}
								completed={visibleCompletedSteps.includes(idx)}
							>
								{label}
							</S.StepLabel>
							{visibleCompletedSteps.includes(idx) && (
								<S.EditButton onClick={() => handleEdit(idx)}>수정</S.EditButton>
							)}
						</S.Step>
					))}
				</S.Progress>
			</S.Header>

			<S.Content>
				{renderStepContent()}
				<S.ButtonGroup>
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