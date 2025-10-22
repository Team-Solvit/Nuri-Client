'use client'

import { useState, useMemo, useRef, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import { GroupService } from '@/services/group';
import { GroupSchedule } from '@/types/group';
import { useAlertStore } from '@/store/alert';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useRouter } from 'next/navigation';
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import * as S from "./style";
import Square from '@/components/ui/button/square';

export default function MeetingThirdPartyDetailContainer({ id }: { id: string }) {
  const client = useApolloClient();
  const { error: showAlert, success: showSuccess } = useAlertStore();
  const { upload: uploadFile, loading: uploadLoading } = useFileUpload();
  const router = useRouter();
  const navigate = useNavigationWithProgress();

  const [schedule, setSchedule] = useState<GroupSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [scheduleRecords, setScheduleRecords] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [groupId, setGroupId] = useState<string>('');

  const fetchSchedule = async () => {
    try {
      const groupStatus = await GroupService.getGroupStatus(client);
      if (groupStatus?.groupId) {
        setGroupId(groupStatus.groupId);
        const schedules = await GroupService.getAllSchedules(client, groupStatus.groupId);
        const foundSchedule = schedules.find((s: GroupSchedule) => s.scheduleId === id);
        if (foundSchedule) {
          setSchedule(foundSchedule);
          try {
            const records = await GroupService.getGroupScheduleRecords(client, id);
            setScheduleRecords(records);
          } catch (recordError) {
            console.error('기록 조회 실패:', recordError);
          }
          try {
            const participantsList = await GroupService.getGroupScheduleParticipants(client, id);
            setParticipants(participantsList);
          } catch (participantError) {
            console.error('참가자 조회 실패:', participantError);
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

  useEffect(() => {
    if (!id) {
      showAlert('일정 ID가 없습니다.');
      setLoading(false);
      return;
    }
    fetchSchedule();
  }, [id, client, showAlert]);

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
  const [expense, setExpense] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setLocation(schedule.location);
      setAmpm(parsedTime.ampm);
      setHour(parsedTime.hour);
      setMinute(parsedTime.minute);
      setExpense(schedule.expense || 0);
      setDescription(schedule.description || '');
    }
  }, [schedule, parsedTime]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const acceptDoc = ".hwp,.hwpx,.doc,.docx,.pdf,application/x-hwp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf";
  const TEMPLATE_URL = "https://cdn.solvit-nuri.com/file/30a6aa26-e242-4633-b2fb-2f3b61bad124";

  const handleUpdateSchedule = async () => {
    if (!schedule || !id) {
      showAlert('일정 정보가 없습니다.');
      return;
    }

    setUpdating(true);

    try {
      let hour24 = hour;
      if (ampm === 'AM' && hour === 12) {
        hour24 = 0;
      } else if (ampm === 'PM' && hour !== 12) {
        hour24 = hour + 12;
      }
      const currentDate = new Date(schedule.scheduledAt);
      currentDate.setHours(hour24, minute, 0, 0);

      const input = {
        scheduleId: id,
        title,
        description,
        location,
        scheduledAt: currentDate.toISOString(),
        durationMinutes: schedule.durationMinutes || 60,
        file: schedule.file || '',
        expense: expense || 0
      };

      const updateResult = await GroupService.updateGroupSchedule(client, input);
      console.log('일정 수정 결과:', updateResult);

      await fetchSchedule();

      showSuccess('일정이 수정되었습니다.');

      setTimeout(() => {
        router.replace('/meeting/third-party?refresh=true');
      }, 1000);

    } catch (error) {
      console.error('일정 수정 실패:', error);
      showAlert('일정 수정에 실패했습니다.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!id) {
      showAlert('일정 정보가 없습니다.');
      return;
    }
    if (!window.confirm('정말로 이 일정을 삭제하시겠습니까?')) return;

    try {
      await GroupService.deleteGroupSchedule(client, id);

      showSuccess('일정이 삭제되었습니다.');

      setTimeout(() => {
        router.replace('/meeting/third-party?refresh=true');
      }, 1000);

    } catch (error) {
      console.error('일정 삭제 실패:', error);
      showAlert('일정 삭제에 실패했습니다.');
    }
  };

  const handleRecordUpload = async (fileToUpload?: File) => {
    const fileToUse = fileToUpload || record;

    if (!fileToUse || !id) {
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
        scheduleId: id,
        fileUrl: uploadResult[0],
      };

      await GroupService.createGroupScheduleRecord(client, recordInput);

      const records = await GroupService.getGroupScheduleRecords(client, id);

      setScheduleRecords(records);

      showSuccess(`파일 "${fileToUse.name}"이 성공적으로 업로드되었습니다.`);

    } catch (error) {
      console.error('기록 업로드 실패:', error);
      showAlert('기록 업로드에 실패했습니다.');
    }
  };

  const handleParticipantClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) return <S.Wrapper>로딩 중...</S.Wrapper>;
  if (!schedule) return <S.Wrapper>일정 정보를 찾을 수 없습니다.</S.Wrapper>;

  return (
    <S.Wrapper>
      <S.Header>
        <h1>{title || '일정 상세'}</h1>
        <Square
          text={updating ? "저장 중..." : "저장"}
          onClick={handleUpdateSchedule}
          status={!updating}
          width="max-content"
        />
        <Square
          text="삭제"
          onClick={handleDeleteSchedule}
          status={!updating}
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
                disabled={updating}
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
                disabled={updating}
              />
            </S.FieldInputBox>
          </S.Field>
          <S.Field>
            <S.FieldLabel htmlFor="meeting-description">설명</S.FieldLabel>
            <S.FieldInputBox>
              <S.FieldInput
                id="meeting-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="설명을 입력하세요"
                disabled={updating}
              />
            </S.FieldInputBox>
          </S.Field>
          <S.Field>
            <S.FieldLabel htmlFor="meeting-expense">비용</S.FieldLabel>
            <S.FieldInputBox>
              <S.FieldInput
                id="meeting-expense"
                type="number"
                value={expense}
                onChange={e => setExpense(Number(e.target.value))}
                placeholder="비용을 입력하세요"
                disabled={updating}
              />
            </S.FieldInputBox>
          </S.Field>
        </S.Content>
        <S.TimePanel>
          <S.TimeRow>
            <S.DateInput
              id="meeting-date"
              type="date"
              value={schedule ? new Date(schedule.scheduledAt).toISOString().slice(0, 10) : ''}
              onChange={e => {
                if (!schedule || updating) return;
                const newDate = e.target.value;
                const old = new Date(schedule.scheduledAt);
                const [year, month, day] = newDate.split('-').map(Number);
                old.setFullYear(year, month - 1, day);
                setSchedule({ ...schedule, scheduledAt: old.toISOString() });
              }}
              disabled={updating}
            />
            <S.AmPmRow>
              <S.AmPmBtn
                active={ampm === 'AM'}
                onClick={() => !updating && setAmpm('AM')}
                disabled={updating}
              >
                오전
              </S.AmPmBtn>
              <S.AmPmBtn
                active={ampm === 'PM'}
                onClick={() => !updating && setAmpm('PM')}
                disabled={updating}
              >
                오후
              </S.AmPmBtn>
            </S.AmPmRow>
          </S.TimeRow>
          <div style={{ marginTop: 12 }}>
            <S.TimeGrid>
              {hours.map(h => (
                <S.TimeCell
                  key={h}
                  active={h === hour}
                  onClick={() => !updating && setHour(h)}
                  disabled={updating}
                >
                  {h}
                </S.TimeCell>
              ))}
            </S.TimeGrid>
          </div>
          <div>
            <S.TimeGrid>
              {minutes.map(m => (
                <S.TimeCell
                  key={m}
                  active={m === minute}
                  onClick={() => !updating && setMinute(m)}
                  disabled={updating}
                >
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
            onClick={() => !uploadLoading && !updating && fileInputRef.current?.click()}
            status={!uploadLoading && !updating}
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
              if (file && !updating) {
                setRecord(file);
                setRecordTitle(file.name.replace(/\.[^/.]+$/, ''));
                await handleRecordUpload(file);
              }
            }}
          />
        </S.RecordHeader>
        {scheduleRecords?.length > 0 ? (
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
            <S.RecordInfoText style={{ color: '#8c8c8c' }}>
              아직 등록된 모임 기록이 없습니다.<br />업로드 또는 형식 받기로 기록을 추가해보세요.
            </S.RecordInfoText>
          </S.RecordBox>
        )}
      </S.RecordSection>
      <S.RecordSection>
        <S.RecordHeader>
          <S.RecordTitle>참가 희망자</S.RecordTitle>
        </S.RecordHeader>
        {participants?.length > 0 ? (
          <S.ParticipantsList>
            {participants.map((participant) => (
              <S.ParticipantItem key={participant.userId} onClick={() => handleParticipantClick(participant.userId)}>
                <S.ParticipantProfile>
                  {participant.profile ? (
                    <S.ProfileImage src={participant.profile} alt={participant.name} />
                  ) : (
                    <S.ProfilePlaceholder>{participant.name?.[0] || '?'}</S.ProfilePlaceholder>
                  )}
                  <S.ParticipantInfo>
                    <S.ParticipantName>{participant.name}</S.ParticipantName>
                    <S.ParticipantEmail>{participant.userId}</S.ParticipantEmail>
                  </S.ParticipantInfo>
                </S.ParticipantProfile>
              </S.ParticipantItem>
            ))}
          </S.ParticipantsList>
        ) : (
          <S.RecordBox style={{ justifyContent: 'center' }}>
            <S.RecordInfoText style={{ color: '#8c8c8c' }}>
              아직 참가 희망자가 없습니다.
            </S.RecordInfoText>
          </S.RecordBox>
        )}
      </S.RecordSection>
    </S.Wrapper>
  );
}