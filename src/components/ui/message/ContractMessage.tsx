import styled from "@emotion/styled";
import { colors, fontSizes, radius } from "@/styles/theme";
import React from "react";
import { MESSAGE_MAX_WIDTH_MOBILE } from "@/constants/constant";
import { mq } from "@/styles/media";
import { Contract } from "@/types/message";
import {imageCheck} from "@/utils/imageCheck";

const ContractBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.line};
  max-width: 320px;
  width: 100%;
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${mq.mobile} {
    max-width: ${MESSAGE_MAX_WIDTH_MOBILE}px;
  }
`;

const ContractThumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 1.1rem 1.1rem 0 0;
  height: 180px;
`;

const ContractContent = styled.div`
  width: 100%;
  padding: 0 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContractTitle = styled.div`
  font-size: ${fontSizes.H4};
  color: ${colors.text};
  font-weight: 500;
  margin: 0.2rem 0;
`;

const ContractHouse = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin: 0.8rem 0;
`;

const ContractButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

const MsgTime = styled.div<{ isSent?: boolean }>`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
  font-weight: 300;
  position: absolute;
  bottom: 0;
  ${({ isSent }) => (isSent ? "left: -4.5rem;" : "right: -4.5rem;")};
`;

const DetailButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

/* ✅ Status 애니메이션 및 스타일 개선 */
const Status = styled.div<{ isAgree: boolean; visible?: boolean }>`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: ${(props) =>
    props.isAgree ? colors.success : colors.error};
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: ${radius.lg};
  font-size: ${fontSizes.Small};
  font-weight: 400;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  /* 등장 애니메이션 */
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateY(${(props) => (props.visible ? "0" : "-8px")});
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: all 0.35s ease;
`;

interface ContractMessageProps {
	contract: Contract;
	time?: string;
	isSent?: boolean;
	onDetail?: () => void;
	button?: React.ReactNode;
}
const STATUS_MAP = {
	ACTIVE: { text: "수락", isAgree: true },
  REJECTED: { text: "거절", isAgree: false },
	EXPIRED: { text: "만료", isAgree: false },
	DELETED : { text: "만료", isAgree: false },
// PENDING: PENDING 상태에서는 뱃지를 표시하지 않습니다
} as const;
const ContractMessage: React.FC<ContractMessageProps> = ({
	                                                         contract,
	                                                         time,
	                                                         isSent,
	                                                         onDetail,
	                                                         button,
                                                         }) => {
	const status = contract.status;
	const m = STATUS_MAP[status as keyof typeof STATUS_MAP];
	
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{m && <Status isAgree={m.isAgree} visible>{m.text}</Status>}
			
			<ContractBubble>
				<ContractThumbnail
					src={imageCheck(contract?.thumbnail)}
					alt="contract-img"
				/>
				<ContractContent>
					<ContractHouse>
						{contract?.boardingHouseName} {contract?.roomName}
					</ContractHouse>
					
					<ContractTitle>
						{status === "ACTIVE" && "계약이 완료되었어요"}
						{status === "PENDING" && "계약요청이 생성되었어요"}
						{status === "REJECTED" && "계약이 취소됐어요"}
						{status === "EXPIRED" && "계약이 만료되었어요"}
						{status === "DELETED" && "계약이 만료되었어요"}
					</ContractTitle>
					
					<ContractButtonWrapper>
						{button ? button : onDetail && (
							<DetailButton onClick={onDetail}>자세히보기</DetailButton>
						)}
					</ContractButtonWrapper>
				</ContractContent>
			</ContractBubble>
			
			{time && <MsgTime isSent={isSent}>{time}</MsgTime>}
		</div>
	);
};

export default ContractMessage;