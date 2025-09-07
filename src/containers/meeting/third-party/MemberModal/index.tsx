import React, { useState, useEffect } from "react";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Modal from "@/components/layout/modal";
import { useApollo } from "@/lib/apolloClient";
import { GroupService } from "@/services/group";
import type { GroupMember, GroupParticipationRequest } from "@/types/group";
import { useAlertStore } from "@/store/alert";

interface MemberModalProps {
  groupId?: string;
  onDone?: () => void;
}

export default function MemberModal({ groupId, onDone }: MemberModalProps) {
  const client = useApollo();
  const { success, error } = useAlertStore();
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [requests, setRequests] = useState<GroupParticipationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expelIdx, setExpelIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 더미 데이터 (백업용)
  const dummyRequests = [
    { name: "오주현(xx._un8)", desc: "그랜마하우스에서 생활중" },
  ];

  const dummyMembers = [
    { name: "윤도훈(dohun_08)", desc: "그랜마하우스에서 생활중" },
    { name: "조아라(a.ra_08)", desc: "그랜마하우스에서 생활중" },
  ];

  useEffect(() => {
    if (groupId) {
      loadMemberData();
    } else {
      setLoading(false);
    }
  }, [groupId]);

  const loadMemberData = async () => {
    if (!groupId) return;

    try {
      setLoading(true);
      const memberData = await GroupService.getGroupMembers(client, groupId);
      setMembers(memberData || []);
      
      // 참가 요청은 별도 API가 필요하므로 일단 빈 배열
      setRequests([]);
    } catch (err) {
      console.error('멤버 데이터 로드 실패:', err);
      error('멤버 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleExpelClick = (idx: number) => {
    setExpelIdx(idx);
    setModalOpen(true);
  };

  const handleExpelConfirm = async () => {
    if (expelIdx === null || !groupId) return;
    
    const memberToExpel = displayMembers[expelIdx];
    if (!memberToExpel) return;

    try {
      await GroupService.removeMember(client, groupId, memberToExpel.userId);
      await loadMemberData(); // 데이터 다시 로드
      success('멤버가 추방되었습니다.');
    } catch (err) {
      console.error('멤버 추방 실패:', err);
      error('멤버 추방에 실패했습니다.');
    } finally {
      setModalOpen(false);
      setExpelIdx(null);
    }
  };

  const handleExpelCancel = () => {
    setModalOpen(false);
    setExpelIdx(null);
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await GroupService.approveParticipationRequest(client, requestId);
      await loadMemberData(); // 데이터 다시 로드
      success('참가 요청을 수락했습니다.');
    } catch (err) {
      console.error('참가 요청 수락 실패:', err);
      error('참가 요청 수락에 실패했습니다.');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await GroupService.rejectParticipationRequest(client, requestId);
      await loadMemberData(); // 데이터 다시 로드
      success('참가 요청을 거절했습니다.');
    } catch (err) {
      console.error('참가 요청 거절 실패:', err);
      error('참가 요청 거절에 실패했습니다.');
    }
  };

  // 실제 데이터가 있으면 사용, 없으면 더미 데이터
  const displayMembers = members.length > 0 ? members : dummyMembers.map((dummy, idx) => ({
    userId: `dummy-${idx}`,
    name: dummy.name,
    email: `dummy${idx}@example.com`,
    joinedAt: new Date().toISOString()
  }));

  const displayRequests = requests.length > 0 ? requests : dummyRequests.map((dummy, idx) => ({
    requestId: `dummy-req-${idx}`,
    requesterName: dummy.name,
    requestMessage: dummy.desc,
    requestDate: new Date().toISOString()
  }));

  if (loading) {
    return (
      <S.MemberModalWrapper>
        <S.ModalTitle>모임원 목록</S.ModalTitle>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          로딩 중...
        </div>
      </S.MemberModalWrapper>
    );
  }

  return (
    <>
      <S.MemberModalWrapper>
        <S.ModalTitle>모임원 목록</S.ModalTitle>
        <S.SectionCol>
          <div style={{ marginBottom: 12 }}>
            <S.SectionTitle>모임 참가 요청</S.SectionTitle>
            {displayRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                참가 요청이 없습니다.
              </div>
            ) : (
              displayRequests.map((request, idx) => (
                <S.Card key={request.requestId || idx}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <S.ProfileBox>
                      <S.ProfileText>프로필</S.ProfileText>
                    </S.ProfileBox>
                    <S.InfoCol>
                      <S.Name>{request.requesterName || '알 수 없음'}</S.Name>
                      <S.Desc>
                        <span>{request.requestMessage || '참가 요청'}</span>
                      </S.Desc>
                    </S.InfoCol>
                  </div>
                  <S.BtnRow>
                    <S.AcceptBtn onClick={() => handleAcceptRequest(request.requestId)}>
                      수락
                    </S.AcceptBtn>
                    <S.RejectBtn onClick={() => handleRejectRequest(request.requestId)}>
                      거절
                    </S.RejectBtn>
                  </S.BtnRow>
                </S.Card>
              ))
            )}
          </div>
          <div>
            <S.SectionTitle>모임원 ({displayMembers.length}명)</S.SectionTitle>
            {displayMembers.map((member, idx) => (
              <S.Card key={member.userId || idx}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <S.ProfileBox>
                    <S.ProfileText>프로필</S.ProfileText>
                  </S.ProfileBox>
                  <S.InfoCol>
                    <S.Name>{member.name}</S.Name>
                    <S.Desc>
                      <span>
                        {new Date(member.joinedAt).toLocaleDateString('ko-KR')} 가입
                      </span>
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
