"use client";

import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { colors, fontSizes, radius, zIndex } from '@/styles/theme';
import { mq } from '@/styles/media';
import Square from '@/components/ui/button/square';

interface Props {
  periods: number[];
  onConfirm: (period: number) => void;
  onClose: () => void;
}

export default function ContractPeriodModal({ periods, onConfirm, onClose }: Props) {
  const uniqueSorted = useMemo(() => Array.from(new Set(periods)).sort((a, b) => a - b), [periods]);
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
  const handlePeriodSelect = (period: number) => {
    setSelectedPeriod(period);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    if (selectedPeriod) {
      setIsLoading(true);
      try {
        await onConfirm(selectedPeriod);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setStep('select');
    setSelectedPeriod(null);
  };

  return (
    <Popover onClick={(e) => e.stopPropagation()}>
      {step === 'select' ? (
        <>
          <Title>계약 기간 선택</Title>
          <List>
            {uniqueSorted.map((p) => (
              <Item key={p} onClick={() => handlePeriodSelect(p)}>
                {p}개월
              </Item>
            ))}
          </List>
          <Footer>
            <Square text="닫기" onClick={onClose} status={false} width="max-content" />
          </Footer>
        </>
      ) : (
        <>
          <Title>계약 요청 확인</Title>
          <Message>{selectedPeriod}개월 계약 요청을 보내시겠습니까?</Message>
          <ButtonGroup>
            <Square text="이전" onClick={handleBack} status={false} width="max-content" isLoading={isLoading} />
            <Square text="전송" onClick={handleConfirm} status={true} width="max-content" isLoading={isLoading} />
          </ButtonGroup>
        </>
      )}
    </Popover>
  );
}

const Popover = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  width: 280px;
  background: #fff;
  border-radius: ${radius.lg};
  box-shadow: 0 0.25rem 1rem rgba(0,0,0,0.1);
  padding: 1rem;
  z-index: ${zIndex.modal};

  ${mq.mobile} {
    bottom: unset;
    left: -340%;
    top: 0.5rem;
    transform: translateX(0) translateY(40px);
  }
`;

const Title = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${colors.text};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 220px;
  overflow: auto;
`;

const Item = styled.button`
  padding: 0.6rem 0.8rem;
  border: 1px solid ${colors.line};
  border-radius: ${radius.md};
  background: #fff;
  text-align: left;
  cursor: pointer;
  &:hover { background: ${colors.line2}; }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const Message = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  text-align: center;
  margin: 1rem 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
