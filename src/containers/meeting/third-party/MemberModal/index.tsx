import React, { useState } from "react";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Modal from "@/components/layout/modal";

interface MemberModalProps {
  onDone?: () => void;
}

const dummyRequests = [
  { name: "오주현(xx._un8)", desc: "그랜마하우스에서 생활중" },
];

const dummyMembers = [
  { name: "윤도훈(dohun_08)", desc: "그랜마하우스에서 생활중" },
  { name: "조아라(a.ra_08)", desc: "그랜마하우스에서 생활중" },
];

export default function MemberModal({ onDone }: MemberModalProps) {
  const [expelIdx, setExpelIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleExpelClick = (idx: number) => {
    setExpelIdx(idx);
    setModalOpen(true);
  };

  const handleExpelConfirm = () => {
    setModalOpen(false);
    setExpelIdx(null);
    // TODO: 멤버 목록에서 제거 등 추가 구현 필요
  };

  const handleExpelCancel = () => {
    setModalOpen(false);
    setExpelIdx(null);
  };

  return (
    <>
      <S.MemberModalWrapper>
        <S.ModalTitle>모임원 목록</S.ModalTitle>
        <S.SectionCol>
          <div style={{ marginBottom: 12 }}>
            <S.SectionTitle>모임 참가 요청</S.SectionTitle>
            {dummyRequests.map((member, idx) => (
              <S.Card key={member.name + idx}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <S.ProfileBox>
                    <S.ProfileText>프로필</S.ProfileText>
                  </S.ProfileBox>
                  <S.InfoCol>
                    <S.Name>{member.name}</S.Name>
                    <S.Desc>
                      <span>{member.desc}</span>
                    </S.Desc>
                  </S.InfoCol>
                </div>
                <S.BtnRow>
                  <S.AcceptBtn>수락</S.AcceptBtn>
                  <S.RejectBtn>거절</S.RejectBtn>
                </S.BtnRow>
              </S.Card>
            ))}
          </div>
          <div>
            <S.SectionTitle>모임원</S.SectionTitle>
            {dummyMembers.map((member, idx) => (
              <S.Card key={member.name + idx}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <S.ProfileBox>
                    <S.ProfileText>프로필</S.ProfileText>
                  </S.ProfileBox>
                  <S.InfoCol>
                    <S.Name>{member.name}</S.Name>
                    <S.Desc>
                      <span>{member.desc}</span>
                    </S.Desc>
                  </S.InfoCol>
                </div>
                <S.ExpelBtn onClick={() => handleExpelClick(idx)}>추방</S.ExpelBtn>
              </S.Card>
            ))}
          </div>
        </S.SectionCol>
        <Square text="완료" onClick={onDone || (() => { })} status={true} width="100%" />
      </S.MemberModalWrapper>
      {modalOpen && (
        <Modal>
          <S.ExpelModalWrapper>
            <S.ExpelModalTitle>정말 추방하시겠습니까?</S.ExpelModalTitle>
            <S.ExpelModalBtnRow>
              <Square text="취소" onClick={handleExpelCancel} status={false} width="100%" />
              <Square text="추방" onClick={handleExpelConfirm} status={true} width="100%" />
            </S.ExpelModalBtnRow>
          </S.ExpelModalWrapper>
        </Modal>
      )}
    </>
  );
}
