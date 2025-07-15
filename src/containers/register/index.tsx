'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as S from './style';
import Square from '@/components/ui/button/square';
import { useRouter } from 'next/navigation';

const check = "icons/check.svg";

const steps = [
  '이용약관',
  '활동정보',
  '인증',
  '비밀번호',
  '국적',
];

interface FormData {
  // 스텝 0
  terms1: boolean;
  terms2: boolean;
  terms3: boolean;
  terms4: boolean;
  terms5: boolean;
  terms6: boolean;
  terms7: boolean;
  // 스텝 1
  name: string;
  username: string;
  // 스텝 2
  email: string;
  verificationCode: string;
  // 스텝 3
  password: string;
  confirmPassword: string;
  // 스텝 4
  nationality: string;
  language: string;
}

export default function RegisterContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    terms1: false, terms2: false, terms3: false,
    terms4: false, terms5: false, terms6: false, terms7: false,
    name: '', username: '',
    email: '', verificationCode: '',
    password: '', confirmPassword: '',
    nationality: '', language: '',
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      // 최종 제출: formData를 API에 보낼 수 있습니다.
      console.log('submit', formData);
      router.push('/register/success');
    }
  };

  const handleEdit = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setCompletedSteps(completedSteps.filter(i => i !== stepIndex));
  };

  const onChangeField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <S.Title>아래의 내용을 동의해야 서비스를 이용할 수 있어요.</S.Title>
            <S.SectionBox>누리 약관 및 동의사항</S.SectionBox>
            <S.CheckboxGroup>
              {['terms1', 'terms2', 'terms3'].map((t, i) => (
                <S.CheckboxItem key={t}>
                  <S.Checkbox
                    type="checkbox"
                    id={t}
                    checked={formData[t as 'terms1']}
                    onChange={e => onChangeField(t as any, e.target.checked)}
                  />
                  <S.CheckboxLabel htmlFor={t}>
                    {['서비스 이용약관', '개인정보 수집 이용 동의', '개인정보 제3자 제공 동의'][i]}
                  </S.CheckboxLabel>
                </S.CheckboxItem>
              ))}
            </S.CheckboxGroup>
            <S.SectionBox>본인 인증 약관 및 동의사항</S.SectionBox>
            <S.CheckboxGroup>
              {['terms4', 'terms5', 'terms6', 'terms7'].map((t, i) => (
                <S.CheckboxItem key={t}>
                  <S.Checkbox
                    type="checkbox"
                    id={t}
                    checked={formData[t as 'terms4']}
                    onChange={e => onChangeField(t as any, e.target.checked)}
                  />
                  <S.CheckboxLabel htmlFor={t}>
                    {[
                      '본인 확인 서비스 이용약관(중계기관)',
                      '개인정보 수집 이용 및 위탁 동의',
                      '본인 확인 서비스 고유식별정보 처리 동의사항',
                      '본인확인 서비스 이용약관(본인확인기관)'
                    ][i]}
                  </S.CheckboxLabel>
                </S.CheckboxItem>
              ))}
            </S.CheckboxGroup>
          </>
        );
      case 1:
        return (
          <>
            <S.Title>이름과 사용할 아이디를 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>이름</S.Label>
              <S.Input
                type="text"
                value={formData.name}
                onChange={e => onChangeField('name', e.target.value)}
                placeholder="이름을 입력해주세요."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>아이디</S.Label>
              <S.InputButtonGroup>
                <S.Input
                  type="text"
                  value={formData.username}
                  onChange={e => onChangeField('username', e.target.value)}
                  placeholder="아이디를 입력해주세요."
                />
                <Square text="중복확인" onClick={() => { }} status={true} width='max-content' />
              </S.InputButtonGroup>
            </S.FormGroup>
          </>
        );
      case 2:
        return (
          <>
            <S.Title>사용할 이메일을 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>이메일</S.Label>
              <S.Input
                type="email"
                value={formData.email}
                onChange={e => onChangeField('email', e.target.value)}
                placeholder="이메일을 입력해주세요."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>인증 번호</S.Label>
              <S.InputButtonGroup>
                <S.Input
                  type="text"
                  value={formData.verificationCode}
                  onChange={e => onChangeField('verificationCode', e.target.value)}
                  placeholder="인증 번호를 입력해주세요."
                />
                <Square text="인증" onClick={() => { }} status={true} width='max-content' />
              </S.InputButtonGroup>
            </S.FormGroup>
          </>
        );
      case 3:
        return (
          <>
            <S.Title>사용할 비밀번호를 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>비밀번호</S.Label>
              <S.Input
                type="password"
                value={formData.password}
                onChange={e => onChangeField('password', e.target.value)}
                placeholder="비밀번호를 입력해주세요."
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>비밀번호 재입력</S.Label>
              <S.Input
                type="password"
                value={formData.confirmPassword}
                onChange={e => onChangeField('confirmPassword', e.target.value)}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
              />
            </S.FormGroup>
          </>
        );
      case 4:
        return (
          <>
            <S.Title>국적과 사용할 언어를 선택해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>국적</S.Label>
              <S.Select
                value={formData.nationality}
                onChange={e => onChangeField('nationality', e.target.value)}
              >
                <option value="">국적을 선택해주세요</option>
                <option value="KR">🇰🇷 대한민국</option>
                <option value="US">🇺🇸 미국</option>
                <option value="JP">🇯🇵 일본</option>
                <option value="CN">🇨🇳 중국</option>
                <option value="DE">🇩🇪 독일</option>
                <option value="FR">🇫🇷 프랑스</option>
                <option value="GB">🇬🇧 영국</option>
                <option value="OT">🌍 기타</option>
              </S.Select>
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>언어</S.Label>
              <S.Select
                value={formData.language}
                onChange={e => onChangeField('language', e.target.value)}
              >
                <option value="">언어를 선택해주세요</option>
                <option value="KR">🇰🇷 한국어</option>
                <option value="EN">🇺🇸 영어</option>
                <option value="JP">🇯🇵 일본어</option>
                <option value="CN">🇨🇳 중국어</option>
                <option value="DE">🇩🇪 독일어</option>
                <option value="FR">🇫🇷 프랑스어</option>
                <option value="OT">🌍 기타</option>
              </S.Select>
            </S.FormGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Progress>
          <S.ProgressLine progress={completedSteps.length} />
          {steps.map((label, idx) => (
            <S.Step key={idx}>
              <S.StepCircle
                completed={completedSteps.includes(idx)}
                current={idx === currentStep}
              >
                {completedSteps.includes(idx)
                  ? <Image src={check} alt="완료" width={18} height={18} />
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

        <S.ButtonGroup>
          <Square
            text={currentStep === steps.length - 1 ? '가입완료' : '다음'}
            onClick={handleNext}
            status
            width="100%"
          />
        </S.ButtonGroup>
      </S.Content>
    </S.Wrapper>
  );
}