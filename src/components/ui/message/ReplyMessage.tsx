import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import React from "react";

const ReplyBubbleWrapper = styled.div<{ type: 'sent' | 'received' }>`
  display: flex;
	height: 100%;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  max-width: 20rem;
  margin-bottom: 0.25rem;
  justify-content: ${({type}) => type === 'sent' ? 'flex-end' : 'flex-start'};
  gap: 0.5rem;
  position: absolute;
  top: ${({type}) => type === 'sent' ? '-3rem' : '-3.8rem'};
  z-index: ${zIndex.base};
  ${({type}) => type === "sent" ? "right:0.5rem;" : "left: 0.5rem;"};
`;

const ReplyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: max-content;
`;

const ReplyBubble = styled.div<{ type: 'sent' | 'received' }>`
  background: ${colors.line};
  border-radius: ${radius.lg};
  padding: 0.5rem 1rem;
  max-width: 220px;
  display: flex;
  flex-direction: column;
`;

const ReplyBubbleName = styled.div`
  font-size: ${fontSizes.Small};
  color: ${colors.text};
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

const ReplyBubbleText = styled.div<{ type: 'sent' | 'received' }>`
  font-size: ${fontSizes.Body};
  color: ${colors.gray};
  font-weight: 300;
	width: max-content;
  word-break: break-all;
`;
const ReplyContentBox = styled.div<{ type: 'sent' | 'received' } >`
	display: flex;
	align-items: flex-end;
  justify-content: flex-start;
	width: 100%;
	height: 100%;
	gap: 0.5rem;
	position: relative;
	${({type}) => type === 'sent' && `
		justify-content: flex-end;
	`}
`
const ReplyLine = styled.div`
	width: 2px;
	background: ${colors.line};
	height: 100%;
`

interface ReplyMessageProps {
	type: 'sent' | 'received';
	name: string;
	text: string;
	icon?: React.ReactNode;
	time?: string;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({type, name, text, icon}) => {
	return (
		<ReplyBubbleWrapper type={type}>
			<ReplyBox>
				{type === 'sent' && icon}
				<ReplyBubbleName>{name}님에게 답장</ReplyBubbleName>
				{type === 'received' && icon}
			</ReplyBox>
			<ReplyContentBox type={type}>
				{type === 'received' && <ReplyLine />}
				<ReplyBubble type={type}>
					<ReplyBubbleText type={type}>{text}</ReplyBubbleText>
				</ReplyBubble>
				{type === "sent" && <ReplyLine />}
			</ReplyContentBox>
		</ReplyBubbleWrapper>
	)
};

export default ReplyMessage; 