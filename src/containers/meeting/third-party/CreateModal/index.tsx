import React, { useState } from "react";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import { useApollo } from "@/lib/apolloClient";
import { GroupService } from "@/services/group";
import type { Group, GroupCreateInput, GroupScheduleCreateInput } from "@/types/group";
import { useAlertStore } from "@/store/alert";

interface CreateModalProps {
  hasGroup?: boolean;
  currentGroup?: Group | null;
  onGroupCreated?: (group: Group) => void;
  onScheduleCreated?: () => void;
  onDone?: () => void;
}

export default function CreateModal({
  hasGroup = false,
  currentGroup = null,
  onGroupCreated,
  onScheduleCreated,
  onDone
}: CreateModalProps) {
  const client = useApollo();
  const { success, error } = useAlertStore();

  // 공통 상태
  const [loading, setLoading] = useState(false);

  // 모임 생성 관련 상태
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupIntroduce, setGroupIntroduce] = useState("");
  const [maxParticipation, setMaxParticipation] = useState(10);
  const [area, setArea] = useState("부산광역시 부산진구");
  const [latitude, setLatitude] = useState(35.1595);
  const [longitude, setLongitude] = useState(129.0756);

  // 일정 생성 관련 상태 (기존)
  const [scheduleName, setScheduleName] = useState("");
  const [place, setPlace] = useState("");
  const [expense, setExpense] = useState(0);
  const [date, setDate] = useState<Date | null>(new Date());
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(20);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const createGroup = async () => {
    if (!groupName.trim() || !groupDescription.trim() || !groupIntroduce.trim()) {
      error('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      const groupInput: GroupCreateInput = {
        name: groupName,
        description: groupDescription,
        position: {
          area,
          latitude,
          longitude
        },
        maxParticipation
      };

      const result = await GroupService.createGroup(client, groupInput);

      if (result) {
        const groups = await GroupService.getGroupsByArea(client, area);
        const newGroup = groups.find((g: Group) => g.name === groupName);

        if (newGroup && onGroupCreated) {
          onGroupCreated(newGroup);
        }

        success('모임이 생성되었습니다!');
        onDone?.();
      }
    } catch (err) {
      console.error('모임 생성 실패:', err);
      error('모임 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const createSchedule = async () => {
    if (!scheduleName.trim() || !place.trim() || !date || !currentGroup) {
      error('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);

      // 시간 조합
      const scheduleDateTime = new Date(date);
      let scheduleHour = hour;
      if (ampm === 'PM' && hour !== 12) scheduleHour += 12;
      if (ampm === 'AM' && hour === 12) scheduleHour = 0;

      scheduleDateTime.setHours(scheduleHour, minute, 0, 0);

      const scheduleInput: GroupScheduleCreateInput = {
        groupId: currentGroup.groupId,
        title: scheduleName,
        location: place,
        scheduledAt: scheduleDateTime.toISOString(),
        expense: expense,
        durationMinutes: 120 // 기본 2시간
      };

      await GroupService.createSchedule(client, scheduleInput);

      success('일정이 생성되었습니다!');
      onScheduleCreated?.();
      onDone?.();
    } catch (err) {
      console.error('일정 생성 실패:', err);
      error('일정 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (hasGroup) {
      createSchedule();
    } else {
      createGroup();
    }
  };

  return (
    <S.Wrapper>
      <S.Title>{hasGroup ? "일정 생성" : "모임 생성"}</S.Title>

      {!hasGroup ? (
        // 모임 생성 폼
        <>
          <S.Section>
            <S.Label htmlFor="group-name">모임 이름</S.Label>
            <S.InputBox>
              <S.Input
                id="group-name"
                placeholder="모임 이름을 입력해주세요."
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
              />
            </S.InputBox>
          </S.Section>

          <S.Section>
            <S.Label htmlFor="group-description">모임 설명</S.Label>
            <S.InputBox>
              <S.Input
                id="group-description"
                placeholder="모임에 대한 간단한 설명을 입력해주세요."
                value={groupDescription}
                onChange={e => setGroupDescription(e.target.value)}
              />
            </S.InputBox>
          </S.Section>

          <S.Section>
            <S.Label htmlFor="max-participation">최대 참여 인원</S.Label>
            <S.InputBox>
              <S.Input
                id="max-participation"
                type="number"
                min="2"
                max="50"
                value={maxParticipation}
                onChange={e => setMaxParticipation(parseInt(e.target.value) || 10)}
              />
            </S.InputBox>
          </S.Section>

          <S.Section>
            <S.Label htmlFor="area">지역</S.Label>
            <S.InputBox>
              <S.Input
                id="area"
                placeholder="모임 지역을 입력해주세요."
                value={area}
                onChange={e => setArea(e.target.value)}
              />
            </S.InputBox>
          </S.Section>
        </>
      ) : (
        // 일정 생성 폼 (기존)
        <>
          <S.Section>
            <S.Label htmlFor="schedule-name">일정 이름</S.Label>
            <S.InputBox>
              <S.Input
                id="schedule-name"
                placeholder="일정 이름을 입력해주세요."
                value={scheduleName}
                onChange={e => setScheduleName(e.target.value)}
              />
            </S.InputBox>
          </S.Section>

          <S.Section>
            <S.Label>일정 시간 설정</S.Label>
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
            <S.Label htmlFor="schedule-place">일정 장소</S.Label>
            <S.InputBox>
              <S.Input
                id="schedule-place"
                placeholder="일정 장소를 입력해주세요."
                value={place}
                onChange={e => setPlace(e.target.value)}
              />
            </S.InputBox>
          </S.Section>

          <S.Section>
            <S.Label htmlFor="schedule-expense">예상 비용 (원)</S.Label>
            <S.InputBox>
              <S.Input
                id="schedule-expense"
                type="number"
                min="0"
                placeholder="예상 비용을 입력해주세요."
                value={expense}
                onChange={e => setExpense(parseInt(e.target.value) || 0)}
              />
            </S.InputBox>
          </S.Section>
        </>
      )}

      <Square
        text={loading ? "처리 중..." : "완료"}
        onClick={handleSubmit}
        status={!loading}
        width="100%"
      />
    </S.Wrapper>
  );
}
