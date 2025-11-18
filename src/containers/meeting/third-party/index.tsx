'use client';

import Square from "@/components/ui/button/square";
import * as S from "./style";
import MeetingList from "@/components/ui/third-party/MeetingList";
import MeetingListSkeleton from "@/components/ui/skeleton/MeetingListSkeleton";
import ThirdPartyMeetingSkeleton from "@/components/ui/skeleton/ThirdPartyMeetingSkeleton";
import { useModalStore } from "@/store/modal";
import Modal from "@/components/layout/modal";
import MemberModal from "./MemberModal";
import CreateModal from "./CreateModal";
import GroupEditModal from "./GroupEditModal/GroupEditModal";
import { useState, useEffect } from "react";
import StateModal from "@/components/layout/stateModal";
import { useApollo } from "@/lib/apolloClient";
import { GroupService } from "@/services/group";
import type { Group, GroupSchedule, MeetingListItem } from "@/types/group";
import { useAlertStore } from "@/store/alert";
import { useRouter, useSearchParams } from "next/navigation";

export default function MeetingThirdPartyContainer() {
  const client = useApollo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { success, error } = useAlertStore();
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [upcomingSchedules, setUpcomingSchedules] = useState<GroupSchedule[]>([]);
  const [pastSchedules, setPastSchedules] = useState<GroupSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasGroup, setHasGroup] = useState(false);

  const { isOpen: isOpenList, open: openListStore, close: closeListStore } = useModalStore();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const currentArea = "부산광역시 부산진구";

  useEffect(() => {
    loadGroupData();
  }, []);

  useEffect(() => {
    const refresh = searchParams.get('refresh');
    if (refresh === 'true' && currentGroup) {
      loadGroupSchedules(currentGroup.groupId);
      router.replace('/meeting/third-party');
    }
  }, [searchParams, currentGroup]);

  const loadGroupData = async () => {
    try {
      setLoading(true);

      let groupStatus;
      try {
        groupStatus = await GroupService.getGroupStatus(client);
      } catch {
        groupStatus = null;
      }

      if (groupStatus && groupStatus.hasGroup && groupStatus.groupId) {
        const group = await GroupService.getGroupInfo(client, groupStatus.groupId);
        setCurrentGroup(group);
        setHasGroup(true);
        await loadGroupSchedules(group.groupId);
      } else {
        router.push('/meeting/third-party/create');
        return;
      }
    } catch {
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

      const now = new Date();
      const past = (all || []).filter((schedule: GroupSchedule) => new Date(schedule.scheduledAt) < now);
      setPastSchedules(past);

    } catch {
      error('일정 정보를 불러올 수 없습니다.');
    }
  };

  const convertSchedulesToMeetingList = (schedules: GroupSchedule[]): MeetingListItem[] => {
    return schedules.map((schedule) => ({
      id: schedule.scheduleId,
      title: schedule.title,
      time: new Date(schedule.scheduledAt).toLocaleString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      location: schedule.location,
      scheduleId: schedule.scheduleId
    }));
  };

  const currentMeetingList = hasGroup && upcomingSchedules.length > 0
    ? convertSchedulesToMeetingList(upcomingSchedules)
    : [];

  const previousMeetingList = hasGroup && pastSchedules.length > 0
    ? convertSchedulesToMeetingList(pastSchedules)
    : [];

  const handleOpenList = () => {
    if (!hasGroup) {
      error('먼저 모임을 생성해주세요.');
      return;
    }
    setIsOpenCreate(false);
    openListStore();
  };

  const handleMemberModalClose = () => {
    closeListStore();
    if (currentGroup) {
      loadGroupData();
    }
  };

  const handleOpenCreate = () => {
    if (!hasGroup) {
      router.push('/meeting/third-party/create');
      return;
    }
    closeListStore();
    setIsOpenCreate(true);
  };

  const handleDeleteGroup = () => {
    if (!currentGroup) return;
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!currentGroup) return;

    try {
      await GroupService.deleteGroup(client, currentGroup.groupId);
      setCurrentGroup(null);
      setHasGroup(false);
      setUpcomingSchedules([]);
      setPastSchedules([]);
      setIsDeleteConfirmOpen(false);
      success('모임이 삭제되었습니다.');
      router.push('/meeting/third-party/create');
    } catch {
      setIsDeleteConfirmOpen(false);
      error('모임 삭제에 실패했습니다.');
    }
  };

  const handleEditGroup = () => {
    setIsOpenEdit(true);
  };

  const handleGroupUpdated = (updatedGroup: Group) => {
    setCurrentGroup(updatedGroup);
    success('모임 정보가 수정되었습니다.');
    setIsOpenEdit(false);
  };

  const handleScheduleCreated = () => {
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
    return <ThirdPartyMeetingSkeleton />;
  }

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLeft>
          <h1>{currentGroup?.area?.area || currentArea}</h1>
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
          {hasGroup && (
            <>
              <Square
                text="모임 수정"
                onClick={handleEditGroup}
                status={true}
                width="max-content"
              />
              <Square
                text="모임 삭제"
                onClick={handleDeleteGroup}
                status={true}
                width="max-content"
              />
            </>
          )}
          <Square
            text={hasGroup ? "일정 생성" : "모임 생성"}
            onClick={handleOpenCreate}
            status={true}
            width="max-content"
          />
        </S.HeaderRight>
      </S.Header>
      <S.Section>
        {!hasGroup ? (
          <S.LoadingState>
            <p>그룹 데이터를 불러오는 중입니다...</p>
          </S.LoadingState>
        ) : currentMeetingList.length === 0 && previousMeetingList.length === 0 ? (
          <S.EmptyState>
            <S.EmptyStateText>
              <h3>모임일정이 없습니다.</h3>
              <p>새로운 모임 일정을 만들어 시작해보세요!</p>
            </S.EmptyStateText>
            <Square
              text="일정 만들기"
              onClick={handleOpenCreate}
              status={true}
              width="200px"
            />
          </S.EmptyState>
        ) : (
          <>
            <MeetingList title="현재 진행중인 모임" meetingList={currentMeetingList} />
            <MeetingList title="이전에 진행되었던 모임" meetingList={previousMeetingList} />
          </>
        )}
      </S.Section>
      {isOpenList && currentGroup && (
        <Modal>
          <MemberModal
            groupId={currentGroup.groupId}
            onDone={handleMemberModalClose}
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
      {isOpenEdit && currentGroup && (
        <StateModal isOpen={isOpenEdit} close={() => setIsOpenEdit(false)}>
          <GroupEditModal
            group={currentGroup}
            onDone={() => setIsOpenEdit(false)}
            onUpdated={handleGroupUpdated}
          />
        </StateModal>
      )}
      {isDeleteConfirmOpen && (
        <StateModal isOpen={isDeleteConfirmOpen} close={() => setIsDeleteConfirmOpen(false)}>
          <S.DeleteConfirmModal>
            <S.DeleteConfirmTitle>모임 삭제</S.DeleteConfirmTitle>
            <S.DeleteConfirmMessage>
              정말로 모임을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </S.DeleteConfirmMessage>
            <S.DeleteConfirmButtons>
              <Square
                text="취소"
                onClick={() => setIsDeleteConfirmOpen(false)}
                status={false}
                width="100%"
              />
              <Square
                text="삭제"
                onClick={handleDeleteConfirm}
                status={true}
                width="100%"
              />
            </S.DeleteConfirmButtons>
          </S.DeleteConfirmModal>
        </StateModal>
      )}

    </S.Wrapper>
  )
}