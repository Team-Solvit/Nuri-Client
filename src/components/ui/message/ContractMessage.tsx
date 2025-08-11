import styled from "@emotion/styled";
import {colors, fontSizes, radius} from '@/styles/theme';
import React from "react";
import type {Status} from "@/containers/message/message-content/type";

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
  background-color: ${colors.gray};
  color: white;
  border: none;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
  cursor: not-allowed;
`;

const StatusBox = styled.div<{ status: Status }>`
  position: absolute;
  top: 3%;
  left: 3%;
  background-color: ${(props) =>
    props.status === "success" ? "#E74B3C" : "#71DAAA"
  };
  color: white;
  border-radius: ${radius.lg};
  padding: 0.5rem 1rem;
  font-size: ${fontSizes.Small};
`;

interface ContractMessageProps {
	thumbnail: string;
	name: string;
	time?: string;
	isSent?: boolean;
	button?: React.ReactNode;
	status: Status
}

const ContractMessage: React.FC<ContractMessageProps> = ({thumbnail, name, time, isSent, button, status}) => (
	<div style={{position: 'relative', display: 'inline-block'}}>
		{status !== "ing" && <StatusBox status={status}>{status === "success" ? "거절" : "수락"}</StatusBox>}
		<ContractBubble>
			<ContractThumbnail src={thumbnail} alt="contract-img"/>
			<ContractContent>
				<ContractTitle>{status === "ing" ? "계약 요청이 되었어요" : "계약 요청이 종료되었어요"}</ContractTitle>
				<ContractHouse>{name}</ContractHouse>
				<ContractButtonWrapper>
					{button && status === "ing" ? button : <DetailButton>자세히보기</DetailButton>}
				</ContractButtonWrapper>
			</ContractContent>
		</ContractBubble>
		{time && <MsgTime isSent={isSent}>{time}</MsgTime>}
	</div>
);

export default ContractMessage; 