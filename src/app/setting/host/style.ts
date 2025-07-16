import styled from "@emotion/styled";
import { colors, radius } from "@/styles/theme";

export const Guide = styled.div`
  font-size: 13px;
  color: rgba(255, 0, 0, 0.41);
  margin-left: 22.5rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 4rem;
`;

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Con = styled.div`
  width: 100%;
  display: flex;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  color: ${colors.text};
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: ${colors.text};
  margin-bottom: 8px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 4px;
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
`;

export const RadioRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
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
`;
