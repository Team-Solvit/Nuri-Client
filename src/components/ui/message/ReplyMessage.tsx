import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import React from "react";

const ReplyBubbleWrapper = styled.div<{ type: 'sent' | 'received' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  max-width: 20rem;
  margin-bottom: 0.25rem;
  justify-content: ${({type}) => type === 'sent' ? 'flex-end' : 'flex-start'};
  gap: 0.5rem;
  position: absolute;
  top: -6.5rem;
  z-index: ${zIndex.base};
  ${({type}) => type === "sent" ? "right:0.5rem;" : "left: 0.5rem;"};
`;

const ReplyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ReplyBubble = styled.div<{ type: 'sent' | 'received' }>`
  background: ${colors.line2};
  border-radius: ${radius.lg};
  padding: 0.5rem 1rem;
  max-width: 220px;
  min-width: 120px;
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
  word-break: break-all;
`;

const MsgTime = styled.div<{ isSent?: boolean }>`
  font-size: ${fontSizes.Caption};
  color: ${colors.gray};
  font-weight: 300;
  margin-top: 2px;
  text-align: right;
  position: absolute;
  bottom: 0;
  ${({isSent}) => isSent ? "left: -4rem;" : "right: -4rem;"};
`;

interface ReplyMessageProps {
	type: 'sent' | 'received';
	name: string;
	text: string;
	icon?: React.ReactNode;
	time?: string;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({type, name, text, icon, time}) => (
	<div style={{position: 'relative', display: 'inline-block'}}>
		<ReplyBubbleWrapper type={type}>
			<ReplyBox>
				{type === 'sent' && icon}
				<ReplyBubbleName>{name}님에게 답장</ReplyBubbleName>
				{type === 'received' && icon}
			</ReplyBox>
			<ReplyBubble type={type}>
				<ReplyBubbleText type={type}>{text}</ReplyBubbleText>
			</ReplyBubble>
		</ReplyBubbleWrapper>
		{time && <MsgTime isSent={type === 'sent'}>{time}</MsgTime>}
	</div>
);

export default ReplyMessage; 