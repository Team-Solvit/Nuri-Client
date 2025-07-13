'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as S from './style';
import Square from '@/components/ui/button/square';

const check = "icons/check.svg";

interface StepProps {
  completed: boolean;
  current: boolean;
}

interface ButtonProps {
  primary?: boolean;
}

interface ProgressLineProps {
  progress: number;
}

const steps = [
  '이용약관',
  '활동정보',
  '인증',
  '비밀번호',
  '국적',
];


export default function RegisterContainer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = (): void => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleEdit = (stepIndex: number): void => {
    setCurrentStep(stepIndex);
    setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <S.Title>아래의 내용을 동의해야 서비스를 이용할 수 있어요.</S.Title>
            <S.SectionBox>누리 약관 및 동의사항</S.SectionBox>
            <S.CheckboxGroup>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms1" />
                <S.CheckboxLabel htmlFor="terms1">서비스 이용약관</S.CheckboxLabel>
              </S.CheckboxItem>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms2" />
                <S.CheckboxLabel htmlFor="terms2">개인정보 수집 이용 동의</S.CheckboxLabel>
              </S.CheckboxItem>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms3" />
                <S.CheckboxLabel htmlFor="terms3">개인정보 제3자 제공 동의</S.CheckboxLabel>
              </S.CheckboxItem>
            </S.CheckboxGroup>

            <S.SectionBox>본인 인증 약관 및 동의사항</S.SectionBox>
            <S.CheckboxGroup>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms4" />
                <S.CheckboxLabel htmlFor="terms4">본인 확인 서비스 이용약관(중계기관)</S.CheckboxLabel>
              </S.CheckboxItem>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms5" />
                <S.CheckboxLabel htmlFor="terms5">개인정보 수집 이용 및 위탁 동의</S.CheckboxLabel>
              </S.CheckboxItem>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms6" />
                <S.CheckboxLabel htmlFor="terms6">본인 확인 서비스 고유식별정보 처리 동의사항</S.CheckboxLabel>
              </S.CheckboxItem>
              <S.CheckboxItem>
                <S.Checkbox type="checkbox" id="terms7" />
                <S.CheckboxLabel htmlFor="terms7">본인확인 서비스 이용약관(본인확인기관)</S.CheckboxLabel>
              </S.CheckboxItem>
            </S.CheckboxGroup>
          </div>
        );

      case 1:
        return (
          <div>
            <S.Title>이름과 사용할 아이디를 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>이름</S.Label>
              <S.Input type="text" placeholder="이름을 입력해주세요." />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>아이디</S.Label>
              <S.InputButtonGroup>
                <S.Input type="text" placeholder="아이디를 입력해주세요." />
                <Square text='중복확인' onClick={() => { }} status={true} width='10vw' />
              </S.InputButtonGroup>
            </S.FormGroup>
          </div>
        );

      case 2:
        return (
          <div>
            <S.Title>사용할 이메일을 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>이메일</S.Label>
              <S.Input type="text" placeholder="이메일을 입력해주세요." />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>인증 번호</S.Label>
              <S.InputButtonGroup>
                <S.Input type="text" placeholder="인증 번호를 입력해주세요." />
                <Square text='인증' onClick={() => { }} status={true} width='10vw' />
              </S.InputButtonGroup>
            </S.FormGroup>
          </div>
        );

      case 3:
        return (
          <div>
            <S.Title>사용할 비밀번호를 입력해주세요.</S.Title>
            <S.FormGroup>
              <S.Label>비밀번호</S.Label>
              <S.Input type="password" placeholder="비밀번호를 입력해주세요." />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>비밀번호 재입력</S.Label>
              <S.Input type="password" placeholder="비밀번호를 다시 한 번 입력해주세요." />
            </S.FormGroup>
          </div>
        );

      case 4:
        return (
          <div>
            <S.Title>국적을 선택해주세요</S.Title>
            <S.FormGroup>
              <S.Label>국적</S.Label>
              <S.Select>
                <option>국적을 선택해주세요</option>
                <option>🇰🇷 대한민국</option>
                <option>🇺🇸 미국</option>
                <option>🇯🇵 일본</option>
                <option>🇨🇳 중국</option>
                <option>🇩🇪 독일</option>
                <option>🇫🇷 프랑스</option>
                <option>🇬🇧 영국</option>
                <option>🌍 기타</option>
              </S.Select>
            </S.FormGroup>
          </div>
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
          {steps.map((step, index) => (
            <S.Step key={index}>
              <S.StepCircle
                completed={completedSteps.includes(index)}
                current={index === currentStep}
              >
                {completedSteps.includes(index) ? (
                  <Image src={check} alt="Check" width={18} height={18} />
                ) : (
                  index + 1
                )}
              </S.StepCircle>
              <S.StepLabel
                current={index === currentStep}
                completed={completedSteps.includes(index)}
              >
                {step}
              </S.StepLabel>
              {completedSteps.includes(index) && (
                <S.EditButton onClick={() => handleEdit(index)}>
                  수정
                </S.EditButton>
              )}
            </S.Step>
          ))}
        </S.Progress>
      </S.Header>

      <S.Content>
        {renderStepContent()}

        <S.ButtonGroup>
          <Square text={currentStep === steps.length - 1 ? '가입완료' : '다음'} onClick={handleNext} status={true} width='100%' />
        </S.ButtonGroup>
      </S.Content>
    </S.Wrapper>
  );
}