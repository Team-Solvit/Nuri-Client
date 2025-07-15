import styled from "@emotion/styled";
import {colors, fontSizes, radius} from "@/styles/theme";

export const ModalContainer = styled.div`
  width: 39.5rem;
  background: ${colors.background};
  border-radius: ${radius.md};
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const TopImageWrapper = styled.div`
  width: 100%;
  height: 11.125rem;
  position: relative;
`;

export const Section = styled.section`
  width: 90%;
  margin-top: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${fontSizes.H3};
  font-weight: 550;
  color: ${colors.text};
  margin-bottom: 1.5rem;
`;

export const SubSection = styled.div`
  margin-bottom: 2rem;
`;

export const SubTitle = styled.h3`
  font-size: ${fontSizes.H4};
  font-weight: 500;
  border-left: 0.25rem solid ${colors.primary};
  padding-left: 0.5rem;
  margin-bottom: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const Label = styled.div`
  width: 3.75rem;
  font-size: ${fontSizes.Small};
  font-weight: 500;
  color: ${colors.gray};
`;

export const Value = styled.div`
  margin-left: 1rem;
  font-size: ${fontSizes.Small};
  font-weight: 500;
  color: ${colors.text};
`;

export const ButtonRow = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 2rem 0;
`;
