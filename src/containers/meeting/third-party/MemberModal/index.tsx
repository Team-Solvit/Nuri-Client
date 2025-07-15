import React from "react";
import * as S from "./style";
import Square from "@/components/ui/button/square";

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
  return (
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
              <S.ExpelBtn>추방</S.ExpelBtn>
            </S.Card>
          ))}
        </div>
      </S.SectionCol>
      <Square text="완료" onClick={onDone || (() => { })} status={true} width="100%" />
    </S.MemberModalWrapper>
  );
}
