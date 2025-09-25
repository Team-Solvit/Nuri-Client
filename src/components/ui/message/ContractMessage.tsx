import styled from "@emotion/styled";
import {colors, fontSizes, radius} from '@/styles/theme';
import React from "react";
import {MESSAGE_MAX_WIDTH_MOBILE} from "@/constants/constant";
import {mq} from "@/styles/media";
import {Contract} from "@/types/message";

const ContractBubble = styled.div`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid ${colors.line};
  max-width: 320px;
  width: 100%;
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  font-weight: 400;
  margin: 1.2rem 0 0.2rem 0;
`;

const ContractHouse = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.8rem;
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
  margin-top: 2px;
  text-align: right;
  position: absolute;
  bottom: 0;
  ${({isSent}) => isSent ? "left: -4.5rem;" : "right: -4.5rem;"};
`;
const DetailButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Status = styled.div<{isAgree : boolean}>`
	position: absolute;
	top: 20px;
	left: 20px;
  background-color: ${(props) => (props.isAgree ? colors.success : colors.error)};
  color: white;
	padding: 0.4rem 1rem;
	border-radius: ${radius.md};
	font-size: ${fontSizes.Small};
	font-weight: 300;
	z-index: 1;
`

interface ContractMessageProps {
	contract : Contract
	time?: string;
	isSent?: boolean;
	onDetail?: () => void;
	button?: React.ReactNode;
}

const ContractMessage: React.FC<ContractMessageProps> = ({contract, time, isSent, onDetail, button}) => {
	const status = contract.status;
	return (
		<div style={{position: 'relative', display: 'inline-block'}}>
			{status !== "PENDING" && <Status isAgree = {status === "ACTIVE"}>{status === "ACTIVE" ? "수락" : "거절"}</Status>}
			<ContractBubble>
				<ContractThumbnail src={contract?.thumbnail} alt="contract-img"/>
				<ContractContent>
					<ContractHouse>{contract?.boardingHouseName} {contract?.roomName}</ContractHouse>
					<ContractTitle>
						{status === "ACTIVE" && "계약이 완료되었어요"}
						{status === "PENDING" && "계약요청이 왔어요"}
						{status === "REJECTED" && "계약을 취소했어요"}
						{status === "EXPIRED" && "계약이 만료되었어요"}
					</ContractTitle>
					<ContractButtonWrapper>
						{button ? button : onDetail && <DetailButton onClick={onDetail}>자세히보기</DetailButton>}
					</ContractButtonWrapper>
				</ContractContent>
			</ContractBubble>
			{time && <MsgTime isSent={isSent}>{time}</MsgTime>}
		</div>
	)
};

export default ContractMessage; 