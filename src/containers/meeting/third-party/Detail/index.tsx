'use client'


import { useState, useMemo, useRef } from "react";
import { useMeetingStore } from "@/store/meeting";

import * as S from "./style";
import Square from '@/components/ui/button/square';

export default function MeetingThirdPartyDetailContainer() {
  const TEMPLATE_URL = "https://cdn.solvit-nuri.com/file/30a6aa26-e242-4633-b2fb-2f3b61bad124";
  const meeting = useMeetingStore((s) => s.selected);

  const parsedTime = useMemo(() => {
    if (!meeting?.time) return { ampm: 'AM', hour: 6, minute: 20 };
    const match = meeting.time.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      const hour24 = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      let ampm: 'AM' | 'PM' = 'AM';
      let hour = hour24;
      if (hour24 === 0) {
        hour = 12;
        ampm = 'AM';
      } else if (hour24 === 12) {
        hour = 12;
        ampm = 'PM';
      } else if (hour24 > 12) {
        hour = hour24 - 12;
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }
      return { ampm, hour, minute };
    }
    return { ampm: 'AM', hour: 6, minute: 20 };
  }, [meeting?.time]);

  const [record, setRecord] = useState<File | null>(null);
  const [recordTitle, setRecordTitle] = useState<string>("");
  const [title, setTitle] = useState(meeting?.title || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState(meeting?.location || "");
  const [ampm, setAmpm] = useState<'AM' | 'PM'>(parsedTime.ampm as 'AM' | 'PM');
  const [hour, setHour] = useState(parsedTime.hour);
  const [minute, setMinute] = useState(parsedTime.minute);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const acceptDoc = ".hwp,.hwpx,.doc,.docx,.pdf,application/x-hwp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf";

  if (!meeting) return <S.Wrapper>모임 정보를 찾을 수 없습니다.</S.Wrapper>;

  return (
    <S.Wrapper>
      <S.Header>
        <h1>{title}</h1>
      </S.Header>
      <S.MainRow>
        <S.Content>
          <S.Field>
            <S.FieldLabel htmlFor="meeting-title">제목</S.FieldLabel>
            <S.FieldInputBox>
              <S.FieldInput
                id="meeting-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
            </S.FieldInputBox>
          </S.Field>
          <S.Field>
            <S.FieldLabel htmlFor="meeting-location">장소</S.FieldLabel>
            <S.FieldInputBox>
              <S.FieldInput
                id="meeting-location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="장소를 입력하세요"
              />
            </S.FieldInputBox>
          </S.Field>
        </S.Content>
        <S.TimePanel>
          <S.AmPmRow>
            <S.AmPmBtn active={ampm === 'AM'} onClick={() => setAmpm('AM')}>오전</S.AmPmBtn>
            <S.AmPmBtn active={ampm === 'PM'} onClick={() => setAmpm('PM')}>오후</S.AmPmBtn>
          </S.AmPmRow>
          <div>
            <S.TimeGrid>
              {hours.map(h => (
                <S.TimeCell key={h} active={h === hour} onClick={() => setHour(h)}>{h}</S.TimeCell>
              ))}
            </S.TimeGrid>
          </div>
          <div>
            <S.TimeGrid>
              {minutes.map(m => (
                <S.TimeCell key={m} active={m === minute} onClick={() => setMinute(m)}>
                  {m.toString().padStart(2, '0')}
                </S.TimeCell>
              ))}
            </S.TimeGrid>
          </div>
        </S.TimePanel>
      </S.MainRow>
      <S.RecordSection>
        <S.RecordHeader>
          <S.RecordTitle>모임 기록</S.RecordTitle>
          <Square text="업로드" onClick={() => fileInputRef.current?.click()} status={true} width="max-content" />
          <Square
            text="형식 받기"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open(TEMPLATE_URL, '_blank', 'noopener,noreferrer');
              }
            }}
            status={true}
            width="max-content"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptDoc}
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                setRecord(file);
                setRecordTitle(file.name.replace(/\.[^/.]+$/, ''));
              }
            }}
          />
        </S.RecordHeader>
        {record ? (
          <S.RecordBox>
            <S.RecordMain>
              <S.RecordTitleText>{recordTitle}</S.RecordTitleText>
              <S.RecordInfo>
                <S.RecordInfoRow>
                  <S.RecordInfoIcon src="/icons/meeting-time.svg" alt="시간" />
                  <S.RecordInfoText>{meeting?.time || '-'}</S.RecordInfoText>
                </S.RecordInfoRow>
                <S.RecordInfoRow>
                  <S.RecordInfoIcon src="/icons/meeting-location.svg" alt="장소" />
                  <S.RecordInfoText>{location}</S.RecordInfoText>
                </S.RecordInfoRow>
              </S.RecordInfo>
            </S.RecordMain>
            <Square text="다운로드" onClick={() => { }} status={true} width="max-content" />
          </S.RecordBox>
        ) : (
          <S.RecordBox style={{ justifyContent: 'center' }}>
            <S.RecordInfoText style={{ color: '#8c8c8c' }}>아직 등록된 모임 기록이 없습니다.<br />업로드 또는 형식 받기로 기록을 추가해보세요.</S.RecordInfoText>
          </S.RecordBox>
        )}
      </S.RecordSection>
    </S.Wrapper>
  );
}