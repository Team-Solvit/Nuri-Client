'use client';

import Square from "@/components/ui/button/square";
import * as S from "./style";
import MeetingList from "@/components/ui/third-party/MeetingList";
import { useModalStore } from "@/store/modal";
import Modal from "@/components/layout/modal";
import MemberModal from "./MemberModal";
import CreateModal from "./CreateModal";
import { useState } from "react";
import StateModal from "@/components/layout/stateModal";

export default function MeetingThirdPartyContainer() {

  const curMeetingList = [
    { id: 1, title: "서면 볼링장에서 놀아요!", time: "11월 27일 (수) 13:00~", location: "서면" },
    { id: 2, title: "서면 볼링장에서 놀아요!!", time: "11월 28일 (수) 11:00~", location: "서면 주디스" },
  ];
  const PrevMeetingList = [
    { id: 3, title: "서면 볼링장에서 놀아요!!!", time: "11월 29일 (화) 12:00~", location: "서면 주디스 태화" },
    { id: 4, title: "서면 볼링장에서 놀아요!!!!", time: "11월 30일 (화) 13:00~", location: "서면 주디스 태화 앞" },
  ];

  const { isOpen: isOpenList, open: openListStore, close: closeListStore } = useModalStore();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const handleOpenList = () => {
    setIsOpenCreate(false);
    openListStore();
  };
  const handleOpenCreate = () => {
    closeListStore();
    setIsOpenCreate(true);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLeft>
          <h1>부산광역시 부산진구</h1>
          <p>부산광역시 부산진구에서의 일정을 확인해요</p>
        </S.HeaderLeft>
        <S.HeaderRight>
          <Square text="모임원 목록" onClick={handleOpenList} status={false} width="max-content" />
          <Square text="모임 생성" onClick={handleOpenCreate} status={false} width="max-content" />
        </S.HeaderRight>
      </S.Header>
      <S.Section>
        <MeetingList title="현재 진행중인 모임" meetingList={curMeetingList} />
        <MeetingList title="이전에 진행되었던 모임" meetingList={PrevMeetingList} />
      </S.Section>
      {isOpenList && (
        <Modal>
          <MemberModal onDone={closeListStore} />
        </Modal>
      )}
      {isOpenCreate && (
        <StateModal isOpen={isOpenCreate} close={() => setIsOpenCreate(false)}>
          <CreateModal onDone={() => setIsOpenCreate(false)} />
        </StateModal>
      )}
    </S.Wrapper>
  )
}