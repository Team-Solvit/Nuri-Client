import { mq } from "@/styles/media";
import { colors, fontSizes } from "@/styles/theme";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 50%;
  padding: 24px 0 0 0;

  ${mq.mobile} {
    width: 100%;
    padding: 16px 16px 90px; /* leave space for potential fixed buttons */
    gap: 24px; /* reduce vertical gap */
  }
`;
export const SectionBox = styled.div`
  position: relative;
  height: 48px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  padding: 0 32px;
  z-index: 2;

  ${mq.mobile} {
    height: auto;
    min-height: 44px;
    padding: 0 14px;
    border-radius: 12px;
  }
`;
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  user-select: none;
  position: relative;
`;
export const SectionTitle = styled.div`
  
  color: ${colors.primary};
  font-size: ${fontSizes.H4};
  font-weight: 700;
  letter-spacing: -0.5px;
`;
export const Icon = styled.img<{ dropdownopen?: number }>`
  width: 23px;
  height: 13px;
  margin-left: 8px;
  transition: transform 0.2s;
  transform: rotate(${({ dropdownopen }) => (dropdownopen ? 180 : 0)}deg);
`;
export const DropdownList = styled.ul`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 0 0 14px 14px;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 10;
`;
export const DropdownItem = styled.li<{ selected?: boolean }>`
  padding: 14px 32px;
  
  font-size: ${fontSizes.Body};
  color: ${({ selected }) => (selected ? colors.primary : '#222')};
  background: ${({ selected }) => (selected ? 'rgba(255,76,97,0.07)' : 'none')};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: rgba(255,76,97,0.12);
    color: ${colors.primary};
  }

  ${mq.mobile} {
    padding: 12px 18px;
    font-size: 14px;
  }
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  ${mq.mobile} {
    gap: 12px;
  }
`;
export const SectionLabel = styled.div`
  background: rgba(255,157,157,0.12);
  border: 1px solid ${colors.primary};
  border-radius: 8px;
  color: ${colors.primary};
  font-size: ${fontSizes.Body};
  width: 90px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-weight: 600;

  ${mq.mobile} {
    width: auto;
    font-size: 14px;
    padding: 0 12px;
    margin-bottom: 6px;
  }
`;
export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${mq.mobile} {
    gap: 14px;
  }
`;
export const TodoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(255,76,97,0.06);
  padding: 18px 20px 18px 16px;
  position: relative;
  transition: box-shadow 0.15s;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(255,76,97,0.13);
  }

  ${mq.mobile} {
    padding: 14px 14px 14px 12px;
    gap: 12px;
    border-radius: 12px;
  }
`;
export const CheckBox = styled.img`
  width: 26px;
  height: 26px;
  cursor: pointer;
  margin-top: 2px;
  transition: filter 0.15s;
  &:hover {
    filter: brightness(0.95) drop-shadow(0 0 2px ${colors.primary});
  }

  ${mq.mobile} {
    width: 24px;
    height: 24px;
    margin-top: 0;
  }
`;
export const TodoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${mq.mobile} {
    gap: 2px;
  }
`;
export const TodoTitle = styled.div`
  font-size: 20px;
  color: #222;
  font-weight: 700;
  margin-bottom: 2px;

  ${mq.mobile} {
    font-size: 16px;
    line-height: 1.25;
  }
`;
export const TodoSub = styled.div`
  font-size: 15px;
  color: #8c8c8c;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;

  ${mq.mobile} {
    font-size: 12px;
    gap: 2px 6px;
  }
`;
export const SubIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
`;
export const PlusButton = styled.button`
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${colors.primary};
  color: #fff;
  font-size: ${fontSizes.H4};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(255,76,97,0.10);
  transition: background 0.15s;
  &:hover {
    background: ${colors.primary};
  }

  ${mq.mobile} {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
`;
export const UploadWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${colors.primary};
  font-size: 15px;
  background: #fff0f3;
  border-radius: 6px;
  padding: 8px 14px 8px 12px;
  box-shadow: 0 2px 8px 0 rgba(255,76,97,0.07);
  flex-wrap: nowrap;

  ${mq.mobile} {
    padding: 6px 10px 6px 10px;
    font-size: 12px;
    gap: 6px;
  }
`;
export const FileName = styled.span`
  color: #222;
  font-size: 15px;
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;

  ${mq.mobile} {
    max-width: 200px;
    font-size: 12px;
    margin-left: 4px;
  }
`;
export const ReUploadButton = styled.button`
  background: #fff;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 12px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${colors.primary};
    color: #fff;
  }

  ${mq.mobile} {
    font-size: 12px;
    padding: 4px 10px;
    margin-left: 4px;
  }
`;
