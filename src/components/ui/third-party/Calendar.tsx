'use client'

import React from "react";
import styled from "@emotion/styled";

const days = ["일", "월", "화", "수", "목", "금", "토"];
const prevMonth = [30, 31];
const thisMonth = Array.from({ length: 30 }, (_, i) => i + 1);
const nextMonth = [1, 2, 3];
const today = 11;

export default function Calendar() {
  return (
    <Container>
      <Header>
        <NavBtn aria-label="이전 달">❮</NavBtn>
        <Month>2025년 4월</Month>
        <NavBtn aria-label="다음 달">❯</NavBtn>
      </Header>
      <DaysRow>
        {days.map((d, i) => (
          <Day key={d} color={i === 0 ? "#ff4c61" : i === 6 ? "#7f96ff" : "#222"}>{d}</Day>
        ))}
      </DaysRow>
      <DatesGrid>
        {prevMonth.map((d) => (
          <DateCell key={"prev-" + d} faded>{d}</DateCell>
        ))}
        {thisMonth.map((d) => (
          <DateCell
            key={d}
            highlight={d === 5}
            today={d === today}
          >
            {d}
          </DateCell>
        ))}
        {nextMonth.map((d) => (
          <DateCell key={"next-" + d} faded>{d}</DateCell>
        ))}
      </DatesGrid>
    </Container>
  );
}

const Container = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 32px 0 rgba(0,0,0,0.10);
  width: 100%;
  max-width: 420px;
  padding: 32px 24px 36px 24px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 500px) {
    padding: 16px 4px 20px 4px;
    max-width: 100vw;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Month = styled.div`
  font-family: 'S-Core-Dream', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  letter-spacing: -1px;
`;
const NavBtn = styled.button`
  background: #f7f7fa;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  color: #8c8c8c;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #ff4c61;
    color: #fff;
  }
`;
const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Day = styled.div<{ color: string }>`
  font-family: 'S-Core-Dream', sans-serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ color }) => color};
  letter-spacing: -0.5px;
`;
const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 0;
`;
const DateCell = styled.div<{ faded?: boolean; highlight?: boolean; today?: boolean }>`
  font-family: 'S-Core-Dream', sans-serif;
  font-size: 1.1rem;
  color: ${({ faded, highlight, today }) =>
    highlight ? '#fff' : today ? '#ff4c61' : faded ? '#cfcfd2' : '#222'};
  background: ${({ highlight, today }) =>
    highlight ? '#ffe288' : today ? '#fff0f3' : 'none'};
  border-radius: ${({ highlight, today }) =>
    highlight || today ? '50%' : '0'};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: ${({ today }) => (today ? 700 : 500)};
  box-shadow: ${({ today }) => (today ? '0 0 0 2px #ff4c61' : 'none')};
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: ${({ faded }) => (faded ? 'default' : 'pointer')};
  &:hover {
    background: ${({ faded, highlight, today }) =>
    faded || highlight || today ? undefined : '#f7f7fa'};
  }
`;
