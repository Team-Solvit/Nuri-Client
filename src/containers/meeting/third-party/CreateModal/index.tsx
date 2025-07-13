import React, { useState } from "react";
import * as S from "./style";
import Square from "@/components/ui/button/square";

export default function CreateModal({ onDone }: { onDone?: () => void }) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState<Date | null>(new Date("2025-05-30"));
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(20);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <S.Wrapper>
      <S.Title>모임 생성</S.Title>
      <S.Section>
        <S.Label htmlFor="meeting-name">모임 이름</S.Label>
        <S.InputBox>
          <S.Input
            id="meeting-name"
            placeholder="모임 이름을 입력해주세요."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </S.InputBox>
      </S.Section>
      <S.Section>
        <S.Label>모임 시간 설정</S.Label>
        <S.DateRow>
          <S.InputBox>
            <S.Input
              type="date"
              value={date ? date.toISOString().slice(0, 10) : ''}
              onChange={e => {
                const val = e.target.value;
                setDate(val ? new Date(val) : null);
              }}
              placeholder="날짜를 선택해주세요."
              min={new Date().toISOString().slice(0, 10)}
            />
          </S.InputBox>
        </S.DateRow>
        <S.TimeRow>
          <S.TimeBtn active={ampm === 'AM'} onClick={() => setAmpm('AM')}>오전</S.TimeBtn>
          <S.TimeBtn active={ampm === 'PM'} onClick={() => setAmpm('PM')}>오후</S.TimeBtn>
        </S.TimeRow>
        <S.TimeGrid>
          {hours.map(h => (
            <S.TimeCell key={h} active={h === hour} onClick={() => setHour(h)}>{h}</S.TimeCell>
          ))}
        </S.TimeGrid>
        <S.TimeGrid>
          {minutes.map(m => (
            <S.TimeCell key={m} active={m === minute} onClick={() => setMinute(m)}>
              {m.toString().padStart(2, '0')}
            </S.TimeCell>
          ))}
        </S.TimeGrid>
      </S.Section>
      <S.Section>
        <S.Label htmlFor="meeting-place">모임 장소</S.Label>
        <S.InputBox>
          <S.Input
            id="meeting-place"
            placeholder="모임 장소를 입력해주세요."
            value={place}
            onChange={e => setPlace(e.target.value)}
          />
        </S.InputBox>
      </S.Section>
      <Square text="완료" onClick={onDone || (() => { })} status={true} width="100%" />
    </S.Wrapper>
  );
}
