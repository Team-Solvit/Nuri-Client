'use client'

import { useState } from "react";
import Calendar from "@/components/ui/third-party/Calendar";
import Todos from "@/components/ui/third-party/todos/Todos";
import * as S from "./style";

export default function BoardingHomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <S.Wrapper>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Todos selectedDate={selectedDate} />
    </S.Wrapper>
  );
}