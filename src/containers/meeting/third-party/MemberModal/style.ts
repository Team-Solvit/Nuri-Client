import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';
import { mq } from '@/styles/media';

export const MemberModalWrapper = styled.div`
  padding: 2rem 3rem;
  box-sizing: border-box;
  max-height: 80vh;
  overflow-y: auto;
  min-width: 500px;
  ${mq.mobile} {
    padding: 1.25rem 1rem 2rem;
    width: 90vw;
    margin: 0 auto;
    min-width: unset;
    max-height: 90vh;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${fontSizes.H2};
  color: ${colors.text};
  margin-bottom: 2rem;
  ${mq.mobile} {
    font-size: ${fontSizes.H3};
    margin-bottom: 1.25rem;
  }
`;

export const SectionCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  ${mq.mobile} {
    gap: 0.75rem;
  }
`;

export const SectionTitle = styled.div`
  font-size: ${fontSizes.H3};
  color: ${colors.text};
  margin-bottom: 0.7rem;
  ${mq.mobile} {
    font-size: ${fontSizes.H4};
    margin-bottom: 0.5rem;
  }
`;

export const Card = styled.div`
  display: flex;
  gap: 1rem;
  border: 1px solid ${colors.line};
  border-radius: ${radius.lg2};
  padding: 1.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  ${mq.mobile} {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 1rem;
    border-radius: ${radius.lg2};
    margin-bottom: 0.9rem;
  }
`;

export const ProfileBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${colors.line};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${mq.mobile} {
    width: 3rem;
    height: 3rem;
  }
`;

export const ProfileText = styled.span`
  font-size: ${fontSizes.Caption};
  color: ${colors.text};
`;

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 2rem;
  justify-content: center;
  flex: 1;
  ${mq.mobile} {
    gap: 0.5rem;
  }
`;

export const Name = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
  ${mq.mobile} {
    font-size: ${fontSizes.Body};
  }
`;

export const Desc = styled.div`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
  white-space: nowrap;
  ${mq.mobile} {
    font-size: ${fontSizes.Caption};
  }
`;

export const BtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  ${mq.mobile} {
    gap: 0.5rem;
    flex-wrap: wrap;
    width: auto;
  }
`;

const baseBtn = `
  padding: 0.3rem 1.2rem;
  border-radius: ${radius.sm};
  font-size: ${fontSizes.Caption};
  cursor: pointer;
  line-height: 1.1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

export const AcceptBtn = styled.button`
  ${baseBtn};
  background: rgba(113, 218, 170, 0.1);
  border: 0.026rem solid ${colors.success};
  color: ${colors.success};
  ${mq.mobile} {
    flex: 0;
    font-size: ${fontSizes.Caption};
    padding: 0.4rem 1rem;
  }
`;

export const RejectBtn = styled.button`
  ${baseBtn};
  background: rgba(255, 157, 157, 0.1);
  border: 0.026rem solid ${colors.primary};
  color: ${colors.primary};
  ${mq.mobile} {
    font-size: ${fontSizes.Caption};
    padding: 0.4rem 1rem;
  }
`;

export const ExpelBtn = styled.button`
  ${baseBtn};
  background: rgba(255, 157, 157, 0.1);
  border: 0.026rem solid ${colors.primary};
  color: ${colors.primary};
  ${mq.mobile} {
    font-size: ${fontSizes.Caption};
    padding: 0.45rem 1.05rem;
  }
`;

export const ExpelModalWrapper = styled.div`
  padding: 2rem 2.5rem;
  text-align: center;
  ${mq.mobile} {
    padding: 1.25rem 1.25rem 1.75rem;
  }
`;

export const ExpelModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  ${mq.mobile} {
    font-size: 16px;
    margin-bottom: 18px;
  }
`;

export const ExpelModalBtnRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  ${mq.mobile} {
    gap: 8px;
    flex-direction: row;
  }
`;
