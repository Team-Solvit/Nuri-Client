'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import ArrowLeft from '@/assets/post/arrow/left.svg'
import ArrowRight from '@/assets/post/arrow/right.svg'
import { colors } from "@/styles/theme";
import { mq } from '@/styles/media'

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const today = new Date();

  const startDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    onDateChange(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    onDateChange(new Date(year, month + 1, 1));
  };
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    onDateChange(new Date(year, month, day));
  };

  return (
    <Wrapper>
      <Header>
        <button onClick={prevMonth}>
          <Image src={ArrowLeft} alt="이전 달" width={16} height={16} />
        </button>
        <h1>{year}년 {month + 1}월</h1>
        <button onClick={nextMonth}>
          <Image src={ArrowRight} alt="다음 달" width={16} height={16} />
        </button>
      </Header>

      <Weekdays>
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </Weekdays>

      <DatesGrid>
        {cells.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const isSelected =
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();
          return (
            <DayCell
              key={idx}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => handleDayClick(day)}
              style={{ cursor: day ? 'pointer' : 'default', fontWeight: isSelected ? 700 : undefined }}
            >
              {day ?? ''}
            </DayCell>
          );
        })}
      </DatesGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    width: 30vw;
    border-radius: 8px;
    padding: 16px;

    ${mq.mobile} {
        width: 100%;
        padding: 8px;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 12px;

    button {
        background: none;
        border: none;
        padding: 0.3rem;
        border-radius: 4px;
        font-size: 1.2rem;
        cursor: pointer;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0;
    }

    button:hover {
        background: ${colors.line2};
    }
`

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  
  div:nth-of-type(1) { color: ${colors.primary}; }
  div:nth-of-type(7) { color: #7F96FF; }

  div {
    padding: 4px 0;
  }
`

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  row-gap: 12px;
`

const DayCell = styled.div<{ isToday: boolean; isSelected?: boolean }>`
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

  &:nth-of-type(7n + 1) { color: ${colors.primary}; }
  &:nth-of-type(7n)     { color: #7F96FF; }
  ${({ isToday }) =>
    isToday &&
    `
    color: white !important;
    background-color: #FFE288;
    font-weight: bold;
  `}
  ${({ isSelected }) =>
    isSelected &&
    `
    background: #ff4c61;
    color: #fff !important;
    font-weight: bold;
  `}
`
