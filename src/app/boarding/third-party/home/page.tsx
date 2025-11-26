'use client'

import { useState, useEffect } from "react";
import Calendar from "@/components/ui/third-party/Calendar";
import Todos from "@/components/ui/third-party/todos/Todos";
import * as S from "./style";

export default function BoardingHomePage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  useEffect(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    setSelectedDate(date);
  }, []);

  return (
    <S.Wrapper>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Todos selectedDate={selectedDate} />
    </S.Wrapper>
  );
}