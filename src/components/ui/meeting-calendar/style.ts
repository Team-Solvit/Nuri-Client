import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from "@/styles/theme";
import {mq} from "@/styles/media";

export const MeetingCalenderContainer = styled.div`
  width: calc(100% - 10rem);
  margin-bottom: 4rem;
  padding: 1rem 0;

  ${mq.mobile} {
    width: calc(100% - 2rem);
  }
`

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-size: ${fontSizes.H3};
    font-weight: 500;
  }

  ${mq.mobile} {
    h2 {
      font-size: ${fontSizes.H4};
    }
  }
`;

export const Arrow = styled.div`
  cursor: pointer;
  font-size: ${fontSizes.H4};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: ${fontSizes.Body};
  margin-bottom: 1rem;
`;

export const Weekday = styled.div<{ isSunday?: boolean; isSaturday?: boolean }>`
  color: ${({isSunday, isSaturday}) =>
    isSunday ? 'red' : isSaturday ? 'blue' : 'black'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 80px;

  ${mq.mobile} {
    grid-auto-rows: auto;
    position: relative;
  }
`;

export const DateCell = styled.div<{ isOutside?: boolean }>`
  border: 1px solid #eee;
  padding: 0.5rem;
  position: relative;
  ${({isOutside}) => !isOutside && 'cursor: pointer;'}
  background-color: ${({isOutside}) =>
    isOutside ? colors.line2 : 'white'};

  ${mq.mobile} {
    padding: 0.5rem 0.4rem;
    font-size: ${fontSizes.Caption};
    height: 60px;
    position: static;
  }
`;

export const Schedule = styled.div`
  ${mq.mobile} {
    background: ${colors.primary};
    width: 25px;
    height: 25px;
    border-radius: 100%;
  }

  width: 100%;
  padding: 0.2rem;
  background-color: #FFEDEF;
  color: ${colors.primary};
  border-radius: ${radius.sm};
  border: 1px solid ${colors.primary};
  font-size: ${fontSizes.Caption};
  font-weight: 500
`
export const Popup = styled.div`
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: ${zIndex.dropdown};
  width: 16rem;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
  background-color: ${colors.background};
  padding: 1.2rem 1.4rem;
  border-radius: ${radius.md};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: ${fontSizes.Body};

  & > h3 {
    padding-bottom: 0.5rem;
  }

  ${mq.mobile} {
    top: 30%;
    transform: translate(-50%, -50%);
  }
`;
export const PopupContentBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;

  & > p:first-of-type {
    color: ${colors.gray};
  }
`
export const ImgBox = styled.div`
  position: absolute;
  bottom: -8%;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 2rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
`;

export const PartButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: ${radius.sm};
  background-color: ${colors.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: ${fontSizes.Caption};
  
  &:hover {
    background-color: ${colors.primary};
  }
`;
