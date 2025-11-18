'use client'

import { useState } from "react";
import Calendar from "@/components/ui/third-party/Calendar";
import Todos from "@/components/ui/third-party/todos/Todos";
import styled from '@emotion/styled';
import { mq } from "@/styles/media";

export default function BoardingHomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Wrapper>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Todos selectedDate={selectedDate} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  padding: 8px 100px;

  ${mq.mobile} {
    flex-direction: column;
    padding: 16px;
  }
`;
