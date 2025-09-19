'use client'

import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { GroupService } from '@/services/group';
import { GroupSchedule } from '@/types/group';
import { useAlertStore } from '@/store/alert';
import { useFileUpload } from '@/hooks/useFileUpload';

import * as S from "./style";
import Square from '@/components/ui/button/square';

export default function MeetingThirdPartyDetailContainer() {
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get('scheduleId');
  const client = useApolloClient();
  const { error: showAlert, success: showSuccess } = useAlertStore();
  const { upload: uploadFile, loading: uploadLoading } = useFileUpload();

  const [schedule, setSchedule] = useState<GroupSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [scheduleRecords, setScheduleRecords] = useState<any[]>([]);

  useEffect(() => {
    if (!scheduleId) {
      showAlert('일정 ID가 없습니다.');
      setLoading(false);
      return;
    }

    const fetchSchedule = async () => {
      try {
        const groupStatus = await GroupService.getGroupStatus(client);

        if (groupStatus?.groupId) {
          const schedules = await GroupService.getAllSchedules(client, groupStatus.groupId);
          const foundSchedule = schedules.find((s: GroupSchedule) => s.scheduleId === scheduleId);

          if (foundSchedule) {
            setSchedule(foundSchedule);
            try {
              const records = await GroupService.getGroupScheduleRecords(client, scheduleId);
              setScheduleRecords(records);
            } catch (recordError) {
              console.error('기록 조회 실패:', recordError);
            }
          } else {
            showAlert('일정을 찾을 수 없습니다.');
          }
        } else {
          showAlert('그룹 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('일정 조회 실패:', error);
        showAlert('일정 조회에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [scheduleId, client, showAlert]);

  const parsedTime = useMemo(() => {
    if (!schedule?.scheduledAt) return { ampm: 'AM' as const, hour: 6, minute: 20 };

    const date = new Date(schedule.scheduledAt);
    const hour24 = date.getHours();
    const minute = date.getMinutes();

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
  }, [schedule?.scheduledAt]);

  const [record, setRecord] = useState<File | null>(null);
  const [recordTitle, setRecordTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<string>("");
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState<number>(6);
  const [minute, setMinute] = useState<number>(0);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setLocation(schedule.location);
      setAmpm(parsedTime.ampm);
      setHour(parsedTime.hour);
      setMinute(parsedTime.minute);
    }
  }, [schedule, parsedTime]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const acceptDoc = ".hwp,.hwpx,.doc,.docx,.pdf,application/x-hwp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf";
  const TEMPLATE_URL = "https://cdn.solvit-nuri.com/file/30a6aa26-e242-4633-b2fb-2f3b61bad124";
  const handleUpdateSchedule = async () => {
    if (!schedule || !scheduleId) {
      showAlert('일정 정보가 없습니다.');
      return;
    }

    try {
      let hour24 = hour;
      if (ampm === 'AM' && hour === 12) {
        hour24 = 0;
      } else if (ampm === 'PM' && hour !== 12) {
        hour24 = hour + 12;
      }

      const currentDate = new Date(schedule.scheduledAt);
      currentDate.setHours(hour24, minute, 0, 0);

      // TODO: 백엔드에 일정 업데이트 API가 추가되면 구현
      showAlert('현재 일정 수정 기능은 개발 중입니다.');

    } catch (error) {
      console.error('일정 수정 실패:', error);
      showAlert('일정 수정에 실패했습니다.');
    }
  };

  const handleRecordUpload = async (fileToUpload?: File) => {
    const fileToUse = fileToUpload || record;

    if (!fileToUse || !scheduleId) {
      showAlert('업로드할 파일이 없습니다.');
      return;
    }

    try {
      const uploadResult = await uploadFile([fileToUse]);

      if (!uploadResult || uploadResult.length === 0) {
        showAlert('파일 업로드에 실패했습니다.');
        return;
      }

      const recordInput = {
        scheduleId: scheduleId,
        title: fileToUse.name.replace(/\.[^/.]+$/, ''),
        content: `파일: ${fileToUse.name}`,
        fileUrl: uploadResult[0]
      };

      await GroupService.createGroupScheduleRecord(client, recordInput);

      try {
        const records = await GroupService.getGroupScheduleRecords(client, scheduleId);
        setScheduleRecords(records);
      } catch (recordError) {
        console.error('기록 목록 재조회 실패:', recordError);
      }

      showSuccess(`파일 "${fileToUse.name}"이 성공적으로 업로드되었습니다.`);

    } catch (error) {
      console.error('기록 업로드 실패:', error);
      showAlert('기록 업로드에 실패했습니다.');
    }
  };

  if (loading) return <S.Wrapper>로딩 중...</S.Wrapper>;
  if (!schedule) return <S.Wrapper>일정 정보를 찾을 수 없습니다.</S.Wrapper>;

  return (
    <S.Wrapper>
      <S.Header>
        <h1>{title || '일정 상세'}</h1>
        <Square
          text="저장"
          onClick={handleUpdateSchedule}
          status={true}
          width="max-content"
        />
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
          <Square
            text={uploadLoading ? "업로드 중..." : "업로드"}
            onClick={() => !uploadLoading && fileInputRef.current?.click()}
            status={!uploadLoading}
            width="max-content"
          />
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
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setRecord(file);
                setRecordTitle(file.name.replace(/\.[^/.]+$/, ''));
                await handleRecordUpload(file);
              }
            }}
          />
        </S.RecordHeader>
        {scheduleRecords.length > 0 ? (
          <div>
            {scheduleRecords.map((recordItem) => (
              <S.RecordBox key={recordItem.recordId}>
                <S.RecordMain>
                  <S.RecordTitleText>{recordItem.title}</S.RecordTitleText>
                  <S.RecordInfo>
                    <S.RecordInfoRow>
                      <S.RecordInfoIcon src="/icons/meeting-time.svg" alt="시간" />
                      <S.RecordInfoText>
                        {schedule ? new Date(schedule.scheduledAt).toLocaleString('ko-KR') : '-'}
                      </S.RecordInfoText>
                    </S.RecordInfoRow>
                    <S.RecordInfoRow>
                      <S.RecordInfoIcon src="/icons/meeting-location.svg" alt="장소" />
                      <S.RecordInfoText>{location}</S.RecordInfoText>
                    </S.RecordInfoRow>
                    <S.RecordInfoRow>
                      <S.RecordInfoIcon src="/icons/person.svg" alt="작성자" />
                      <S.RecordInfoText>{recordItem.writerName}</S.RecordInfoText>
                    </S.RecordInfoRow>
                  </S.RecordInfo>
                </S.RecordMain>
                <Square
                  text="다운로드"
                  onClick={() => {
                    // TODO: 실제 파일 다운로드 구현
                    showAlert('다운로드 기능은 개발 중입니다.');
                  }}
                  status={true}
                  width="max-content"
                />
              </S.RecordBox>
            ))}
          </div>
        ) : (
          <S.RecordBox style={{ justifyContent: 'center' }}>
            <S.RecordInfoText style={{ color: '#8c8c8c' }}>아직 등록된 모임 기록이 없습니다.<br />업로드 또는 형식 받기로 기록을 추가해보세요.</S.RecordInfoText>
          </S.RecordBox>
        )}
      </S.RecordSection>
    </S.Wrapper>
  );
}