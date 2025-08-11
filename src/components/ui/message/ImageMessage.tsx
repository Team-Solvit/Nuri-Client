import styled from "@emotion/styled";
import React from "react";
import {mq} from "@/styles/media";
import {MESSAGE_MAX_WIDTH_DESKTOP, MESSAGE_MAX_WIDTH_MOBILE} from "@/constants/constant";

const ImgBubble = styled.div`
  padding: 0;
  background: none;
`;

const Img = styled.img`
  object-fit: cover;
  border-radius: 1rem;
  max-width: ${MESSAGE_MAX_WIDTH_DESKTOP}px;
  max-height: ${MESSAGE_MAX_WIDTH_DESKTOP}px;
  height: auto;
  width: auto;
  display: block;

  ${mq.mobile} {
    max-width: ${MESSAGE_MAX_WIDTH_MOBILE}px;
  }
`;

const MsgTime = styled.div<{ isSent?: boolean }>`
  font-size: 0.75rem;
  color: #888;
  font-weight: 300;
  margin-top: 2px;
  text-align: right;
  position: absolute;
  bottom: 0;
  ${({isSent}) => isSent ? "left: -4rem;" : "right: -4rem;"};
`;

interface ImageMessageProps {
	src: string;
	alt?: string;
	time?: string;
	isSent?: boolean;
}

const ImageMessage: React.FC<ImageMessageProps> = ({src, alt, time, isSent}) => (
	<div style={{position: 'relative', display: 'inline-block'}}>
		<ImgBubble>
			<Img src={src} alt={alt || 'img-msg'}/>
		</ImgBubble>
		{time && <MsgTime isSent={isSent}>{time}</MsgTime>}
	</div>
);

export default ImageMessage; 