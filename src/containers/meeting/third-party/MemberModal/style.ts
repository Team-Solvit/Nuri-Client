import styled from '@emotion/styled';
import { colors, fontSizes, radius } from '@/styles/theme';

export const MemberModalWrapper = styled.div`
  padding: 2rem 3rem;
`;

export const ModalTitle = styled.div`
  font-size: ${fontSizes.H2};
  color: ${colors.text};
  margin-bottom: 2rem;
`;

export const SectionCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SectionTitle = styled.div`
  font-size: ${fontSizes.H3};
  color: ${colors.text};
  margin-bottom: 0.7rem;
`;


export const Card = styled.div`
  display: flex;
  gap: 1rem;
  border: 1px solid ${colors.line};
  border-radius: ${radius.lg2};
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;


export const ProfileBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${colors.line};
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

export const Name = styled.div`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`;

export const Desc = styled.div`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AcceptBtn = styled.button`
  padding: 0.3rem 1.2rem;
  background: rgba(113, 218, 170, 0.1);
  border: 0.026rem solid ${colors.success};
  border-radius: ${radius.sm};
  color: ${colors.success};
  font-size: ${fontSizes.Caption};
  cursor: pointer;
`;

export const RejectBtn = styled.button`
  padding: 0.3rem 1.2rem;
  background: rgba(255, 157, 157, 0.1);
  border: 0.026rem solid ${colors.primary};
  border-radius: ${radius.sm};
  color: ${colors.primary};
  font-size: ${fontSizes.Caption};
  cursor: pointer;
`;

export const ExpelBtn = styled.button`
  padding: 0.3rem 1.2rem;
  background: rgba(255, 157, 157, 0.1);
  border: 0.026rem solid ${colors.primary};
  border-radius: ${radius.sm};
  color: ${colors.primary};
  font-size: ${fontSizes.Caption};
  cursor: pointer;
`;
