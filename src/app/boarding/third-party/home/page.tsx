'use client'

import { useState } from "react";
import Calendar from "@/components/ui/third-party/Calendar";
import Todos from "@/components/ui/third-party/todos/Todos";
import Square from '@/components/ui/button/square';
import * as S from "./style";

export default function BoardingHomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <S.Wrapper>
      <S.HeaderActions>
        <Square
          text="형식 받기"
          status={true}
          width="max-content"
          onClick={() => window.open('https://cdn.solvit-nuri.com/file/a91291e1-8f30-4335-951a-0f5eef917127', '_blank', 'noopener,noreferrer')}
        />
      </S.HeaderActions>
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Todos selectedDate={selectedDate} />
    </S.Wrapper>
  );
}