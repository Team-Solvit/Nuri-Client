'use client'

import Calendar from "@/components/ui/third-party/Calendar";
import Todos from "@/components/ui/third-party/Todos"
import * as S from "./style";

export default function BoardingHomePage() {
  return (
    <S.Wrapper>
      <Calendar />
      <Todos />
    </S.Wrapper>
  );
}