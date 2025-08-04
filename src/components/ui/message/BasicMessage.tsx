import styled from "@emotion/styled";
import {colors, fontSizes, radius, zIndex} from '@/styles/theme';
import {mq} from "@/styles/media";
import {MESSAGE_MAX_WIDTH_DESKTOP, MESSAGE_MAX_WIDTH_MOBILE} from "@/constants/constant";
import React from "react";

const MsgBubble = styled.div<{ isSent?: boolean }>`
  background: ${(props) => props.isSent ? colors.primary : colors.line2};
  border-radius: ${radius.lg};
  padding: 0.8rem 1rem;
  max-width: ${MESSAGE_MAX_WIDTH_DESKTOP}px;
  font-size: ${fontSizes.Body};
  font-weight: 200;
  color: ${colors.text};

  ${mq.mobile} {
    padding: 0.6rem 0.8rem;
    border-radius: 12px;
    max-width: ${MESSAGE_MAX_WIDTH_MOBILE}px;
  }
`;

const MsgText = styled.div<{ isSent?: boolean }>`
  word-break: break-all;
  color: ${({isSent}) => isSent ? colors.background : colors.text};
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

interface BasicMessageProps {
	text: string;
	time?: string;
	isSent?: boolean;
}

const BasicMessage: React.FC<BasicMessageProps> = ({text, time, isSent}) => (
	<div style={{zIndex: zIndex.base}}>
		<MsgBubble isSent={isSent}>
			<MsgText isSent={isSent}>{text}</MsgText>
		</MsgBubble>
		{time && <MsgTime isSent={isSent}>{time}</MsgTime>}
	</div>
);

export default BasicMessage; 