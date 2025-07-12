'use client'

import { useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import {colors} from "@/styles/theme";

export default function Calendar() {
    const [current, setCurrent] = useState(new Date())

    const year = current.getFullYear()
    const month = current.getMonth()

    const startDay = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()

    const cells = [
        ...Array(startDay).fill(null),
        ...Array.from({ length: totalDays }, (_, i) => i + 1),
    ]

    const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

    return (
        <Wrapper>
            <Header>
                <button onClick={prevMonth}>{'<'}</button>
                <h1>{year}년 {month + 1}월</h1>
                <button onClick={nextMonth}>{'>'}</button>
            </Header>

            <Weekdays>
                {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </Weekdays>

            <DatesGrid>
                {cells.map((day, idx) => (
                    <DayCell key={idx} isToday={
                        day === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                    }>
                        {day ?? ''}
                    </DayCell>
                ))}
            </DatesGrid>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 350px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0;
    }
`

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
    
  div:nth-child(1) { color: ${colors.primary}; }
  div:nth-child(7) { color: #7F96FF; }

  div {
    padding: 4px 0;
  }
`

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
  row-gap: 4px;
`

const DayCell = styled.div<{ isToday: boolean }>`
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

  &:nth-of-type(7n + 1) { color: ${colors.primary}; }
  &:nth-of-type(7n)     { color: #7F96FF; }
  ${({ isToday }) =>
     isToday &&
     `
    color: white !important;
    background-color: #FFE288;
    font-weight: bold;
  `}
`
