import Modal from "@/components/layout/modal";
import * as S from "./style";
import Square from "@/components/ui/button/square";
import Image from "next/image";
import { contractData, userData } from "./data";
import { useMessageModalStore } from "@/store/messageModal";
import { useModalStore } from "@/store/modal";

export default function ContractModal() {
    const {isOpen, messageType, master, close} = useMessageModalStore();
    const {close : modalCloase} = useModalStore();
    const closeModal = ()=>{
        modalCloase();
        close();
    }
  return isOpen && messageType==="contract" && (
    <Modal>
      <S.ModalContainer>
        {/* 이미지 */}
        <S.TopImageWrapper>
          <Image
            src={contractData.image}
            alt="계약 이미지"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </S.TopImageWrapper>

        {/* 계약 정보 */}
        <S.Section>
          <S.SectionTitle>계약정보</S.SectionTitle>

          {/* 하숙집 */}
          <S.SubSection>
            <S.SubTitle>하숙집</S.SubTitle>
            <S.InfoRow>
              <S.Label>이름</S.Label>
              <S.Value>{contractData.houseName}</S.Value>
            </S.InfoRow>
            <S.InfoRow>
              <S.Label>기간</S.Label>
              <S.Value>{contractData.period}</S.Value>
            </S.InfoRow>
            <S.InfoRow>
              <S.Label>위치</S.Label>
              <S.Value>{contractData.location}</S.Value>
            </S.InfoRow>
            <S.InfoRow>
              <S.Label>가격</S.Label>
              <S.PriceBox>
                <S.PriceUnit>월</S.PriceUnit>
                <S.PriceValue>{contractData.price}</S.PriceValue>
              </S.PriceBox>
            </S.InfoRow>
          </S.SubSection>

          {/* 하숙생(여러 명 지원) */}
          {userData.length === 1 ? (
            <S.SubSection>
              <S.SubTitle>하숙생</S.SubTitle>
              <S.InfoRow>
                <S.Label>이름</S.Label>
                <S.Value>{userData[0].name}</S.Value>
              </S.InfoRow>
              <S.InfoRow>
                <S.Label>성별</S.Label>
                <S.Value>{userData[0].gender}</S.Value>
              </S.InfoRow>
            </S.SubSection>
          ) : (
            userData.map((user, idx) => (
              <S.SubSection key={user.name}>
                <S.SubTitle>하숙생 {idx + 1}</S.SubTitle>
                <S.InfoRow>
                  <S.Label>이름</S.Label>
                  <S.Value>{user.name}</S.Value>
                </S.InfoRow>
                <S.InfoRow>
                  <S.Label>성별</S.Label>
                  <S.Value>{user.gender}</S.Value>
                </S.InfoRow>
              </S.SubSection>
            ))
          )}
        </S.Section>

        {/* 버튼 */}
        <S.ButtonRow>
          {master ? <>
            <Square text="거절" onClick={() => {}} status={false} width="48%" /> 
            <Square text="수락" onClick={() => {}} status={true} width="48%" />
          </> : <Square text="확인" onClick={closeModal} status={true} width="100%" />}
        </S.ButtonRow>
      </S.ModalContainer>
    </Modal>
  );
}