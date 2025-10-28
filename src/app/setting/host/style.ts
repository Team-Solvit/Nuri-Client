import styled from "@emotion/styled";
import { colors, radius } from "@/styles/theme";
import { mq } from '@/styles/media';

export const Guide = styled.div`
  font-size: 13px;
  color: rgba(255, 0, 0, 0.41);
  margin-left: 22.5rem;

  ${mq.mobile} {
    font-size: 12px;
    margin-left: 0;
  }
`;

export const AuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 2px solid ${colors.primary};
  border-radius: ${radius.md};
  text-align: center;
  background: rgba(0, 123, 255, 0.05);
`;

export const AuthTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

export const AuthDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray};
  margin: 0;
  line-height: 1.5;
`;

export const AuthButtonWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

export const VerifiedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 2px solid #4CAF50;
  border-radius: ${radius.md};
  text-align: center;
  background: rgba(76, 175, 80, 0.05);
`;

export const VerifiedTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #4CAF50;
  margin: 0;
`;

export const VerifiedDescription = styled.p`
  font-size: 0.875rem;
  color: ${colors.text};
  margin: 0;
`;

export const CompletedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border: 2px solid #4CAF50;
  border-radius: ${radius.md};
  background: rgba(76, 175, 80, 0.05);
`;

export const CompletedTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4CAF50;
  margin: 0;
  text-align: center;
`;

export const CompletedDescription = styled.p`
  font-size: 1rem;
  color: ${colors.text};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`;

export const CompletedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: ${radius.sm};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${colors.line};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${colors.gray};
`;

export const InfoValue = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${colors.text};
  text-align: right;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${mq.mobile} {
    gap: 8px;
  }
`;

export const NavArea = styled.div`
  flex: 0 0 20vw;
  background: ${colors.background};
  border-right: 1px solid ${colors.line};

  ${mq.mobile} {
    display: none;
  }
`

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
  padding: 4rem 4.95rem 0rem 4.95rem;

  ${mq.mobile} {
    width: 100%;
    margin: 0;
    gap: 28px;
    padding: 1rem;
  }
`;

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${mq.mobile} {
    gap: 8px;
  }
`;

export const Con = styled.div`
  width: 100%;
  display: flex;

  ${mq.mobile} {
    width: 100%;
    flex-direction: column;
    padding-bottom: 67px;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 16px;

  ${mq.mobile} {
    font-size: 20px;
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: ${colors.text};
  margin-bottom: 8px;

  ${mq.mobile} {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 4px;

  ${mq.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const Input = styled.input`
  flex: 1;
  height: 55px;
  font-size: 16px;
  padding: 0 12px;
  border: 1px solid #b9b9b9;
  border-radius: ${radius.sm};
  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }

  ${mq.mobile} {
    width: 93vw;
    padding: 15px;
  }
`;

export const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${mq.mobile} {
    gap: 12px;
  }
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;

  ${mq.mobile} {
    font-size: 14px;
    gap: 6px;
  }
`;

export const Radio = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #b9b9b9;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  cursor: pointer;

  &:checked {
    background-image: url("/icons/radio.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }

  ${mq.mobile} {
    width: 20px;
    height: 20px;
  }
`;

