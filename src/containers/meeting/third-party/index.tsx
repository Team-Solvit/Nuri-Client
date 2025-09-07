'use client';

import Square from "@/components/ui/button/square";
import * as S from "./style";
import MeetingList from "@/components/ui/third-party/MeetingList";
import { useModalStore } from "@/store/modal";
import Modal from "@/components/layout/modal";
import MemberModal from "./MemberModal";
import CreateModal from "./CreateModal";
import { useState, useEffect } from "react";
import StateModal from "@/components/layout/stateModal";
import { useApollo } from "@/lib/apolloClient";
import { GroupService } from "@/services/group";
import type { Group, GroupSchedule, MeetingListItem } from "@/types/group";
import { useAlertStore } from "@/store/alert";
import { useRouter } from "next/navigation";

export default function MeetingThirdPartyContainer() {
  const client = useApollo();
  const router = useRouter();
  const { success, error } = useAlertStore();
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [upcomingSchedules, setUpcomingSchedules] = useState<GroupSchedule[]>([]);
  const [pastSchedules, setPastSchedules] = useState<GroupSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasGroup, setHasGroup] = useState(false);

  // 더미 데이터 (백업용)
  const curMeetingList = [
    { id: "1", title: "서면 볼링장에서 놀아요!", time: "11월 27일 (수) 13:00~", location: "서면" },
    { id: "2", title: "서면 볼링장에서 놀아요!!", time: "11월 28일 (수) 11:00~", location: "서면 주디스" },
  ];
  const PrevMeetingList = [
    { id: "3", title: "서면 볼링장에서 놀아요!!!", time: "11월 29일 (화) 12:00~", location: "서면 주디스 태화" },
    { id: "4", title: "서면 볼링장에서 놀아요!!!!", time: "11월 30일 (화) 13:00~", location: "서면 주디스 태화 앞" },
  ];

  const { isOpen: isOpenList, open: openListStore, close: closeListStore } = useModalStore();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenGroupSettings, setIsOpenGroupSettings] = useState(false);

  // 지역 정보 (나중에 사용자 위치나 설정에서 가져올 수 있음)
  const currentArea = "부산광역시 부산진구";

  useEffect(() => {
    loadGroupData();
  }, []);

  const loadGroupData = async () => {
    try {
      setLoading(true);
      
      // 현재 지역의 그룹 조회
      const groups = await GroupService.getGroupsByArea(client, currentArea);
      
      if (groups && groups.length > 0) {
        // 첫 번째 그룹을 현재 그룹으로 설정 (나중에 사용자가 속한 그룹 로직으로 변경)
        const group = groups[0];
        setCurrentGroup(group);
        setHasGroup(true);
        
        // 그룹의 일정들 조회
        await loadGroupSchedules(group.groupId);
      } else {
        setHasGroup(false);
      }
    } catch (err) {
      console.error('그룹 데이터 로드 실패:', err);
      error('그룹 정보를 불러올 수 없습니다.');
      setHasGroup(false);
    } finally {
      setLoading(false);
    }
  };

  const loadGroupSchedules = async (groupId: string) => {
    try {
      const [upcoming, all] = await Promise.all([
        GroupService.getUpcomingSchedules(client, groupId),
        GroupService.getAllSchedules(client, groupId)
      ]);

      setUpcomingSchedules(upcoming || []);
      
      // 과거 일정은 전체 일정에서 현재 시간 이전 것들 필터링
      const now = new Date();
      const past = (all || []).filter((schedule: GroupSchedule) => new Date(schedule.scheduledAt) < now);
      setPastSchedules(past);
      
    } catch (err) {
      console.error('일정 로드 실패:', err);
      error('일정 정보를 불러올 수 없습니다.');
    }
  };

  // GraphQL 데이터를 MeetingList 컴포넌트 형식으로 변환
  const convertSchedulesToMeetingList = (schedules: GroupSchedule[]): MeetingListItem[] => {
    return schedules.map((schedule, index) => ({
      id: index + 1, // MeetingList는 number id를 요구하므로 index 사용
      title: schedule.title,
      time: new Date(schedule.scheduledAt).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      location: schedule.location,
      scheduleId: schedule.scheduleId // 실제 일정 ID 추가
    }));
  };

  const handleEditSchedule = (scheduleId: string) => {
    // TODO: 일정 수정 모달 또는 페이지로 이동
    console.log('일정 수정:', scheduleId);
    // router.push(`/meeting/third-party/schedule/edit/${scheduleId}`);
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm('정말 이 일정을 삭제하시겠습니까?')) return;

    try {
      // TODO: 일정 삭제 API 추가 필요
      // await GroupService.deleteSchedule(client, scheduleId);
      
      if (currentGroup) {
        await loadGroupSchedules(currentGroup.groupId);
      }
      success('일정이 삭제되었습니다.');
    } catch (err) {
      console.error('일정 삭제 실패:', err);
      error('일정 삭제에 실패했습니다.');
    }
  };

  // 실제 데이터가 있으면 사용, 없으면 더미 데이터
  const currentMeetingList = hasGroup && upcomingSchedules.length > 0 
    ? convertSchedulesToMeetingList(upcomingSchedules)
    : curMeetingList.map(item => ({ ...item, id: parseInt(item.id) }));
    
  const previousMeetingList = hasGroup && pastSchedules.length > 0 
    ? convertSchedulesToMeetingList(pastSchedules)
    : PrevMeetingList.map(item => ({ ...item, id: parseInt(item.id) }));

  const handleOpenList = () => {
    if (!hasGroup) {
      error('먼저 모임을 생성해주세요.');
      return;
    }
    setIsOpenCreate(false);
    openListStore();
  };

  const handleOpenCreate = () => {
    if (!hasGroup) {
      // 모임이 없으면 모임 생성 페이지로 이동
      router.push('/meeting/third-party/create');
      return;
    }
    closeListStore();
    setIsOpenCreate(true);
  };

  const handleOpenGroupSettings = () => {
    setIsOpenGroupSettings(true);
  };

  const handleDeleteGroup = async () => {
    if (!currentGroup) return;
    
    try {
      await GroupService.deleteGroup(client, currentGroup.groupId);
      setCurrentGroup(null);
      setHasGroup(false);
      setUpcomingSchedules([]);
      setPastSchedules([]);
      success('모임이 삭제되었습니다.');
      setIsOpenGroupSettings(false);
    } catch (err) {
      console.error('모임 삭제 실패:', err);
      error('모임 삭제에 실패했습니다.');
    }
  };

  const handleScheduleCreated = () => {
    // 일정이 생성되면 데이터 다시 로드
    if (currentGroup) {
      loadGroupSchedules(currentGroup.groupId);
    }
    success('일정이 생성되었습니다!');
    setIsOpenCreate(false);
  };

  const handleGroupCreated = (newGroup: Group) => {
    setCurrentGroup(newGroup);
    setHasGroup(true);
    success('모임이 생성되었습니다!');
    setIsOpenCreate(false);
  };

  if (loading) {
    return (
      <S.Wrapper>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          로딩 중...
        </div>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLeft>
          <h1>{currentGroup?.area || currentArea}</h1>
          <p>
            {hasGroup 
              ? `${currentGroup?.name}의 일정을 확인해요`
              : `${currentArea}에서 모임을 생성해보세요`
            }
          </p>
        </S.HeaderLeft>
        <S.HeaderRight>
          <Square 
            text="모임원 목록" 
            onClick={handleOpenList} 
            status={hasGroup} 
            width="max-content" 
          />
          <Square 
            text={hasGroup ? "일정 추가" : "모임 생성"} 
            onClick={handleOpenCreate} 
            status={true} 
            width="max-content" 
          />
          {hasGroup && (
            <Square 
              text="모임 설정" 
              onClick={handleOpenGroupSettings} 
              status={true} 
              width="max-content" 
            />
          )}
        </S.HeaderRight>
      </S.Header>
      <S.Section>
        <MeetingList title="현재 진행중인 모임" meetingList={currentMeetingList} />
        <MeetingList title="이전에 진행되었던 모임" meetingList={previousMeetingList} />
      </S.Section>
      {isOpenList && (
        <Modal>
          <MemberModal 
            groupId={currentGroup?.groupId} 
            onDone={closeListStore} 
          />
        </Modal>
      )}
      {isOpenCreate && hasGroup && (
        <StateModal isOpen={isOpenCreate} close={() => setIsOpenCreate(false)}>
          <CreateModal 
            hasGroup={hasGroup}
            currentGroup={currentGroup}
            onGroupCreated={handleGroupCreated}
            onScheduleCreated={handleScheduleCreated}
            onDone={() => setIsOpenCreate(false)} 
          />
        </StateModal>
      )}
      {isOpenGroupSettings && (
        <Modal>
          <div style={{ padding: '20px', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '20px' }}>모임 설정</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Square 
                text="모임 정보 수정" 
                onClick={() => router.push(`/meeting/third-party/edit/${currentGroup?.groupId}`)} 
                status={true} 
                width="100%" 
              />
              <Square 
                text="모임 삭제" 
                onClick={handleDeleteGroup} 
                status={false} 
                width="100%" 
              />
              <Square 
                text="취소" 
                onClick={() => setIsOpenGroupSettings(false)} 
                status={true} 
                width="100%" 
              />
            </div>
          </div>
        </Modal>
      )}
    </S.Wrapper>
  )
}