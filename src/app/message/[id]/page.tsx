"use client";

import styled from "@emotion/styled";
import MessageHeader from "@/containers/message/message-header/ui";
import MessageSendBar from "@/containers/message/message-sendBar/ui";
import MessageContent from "@/containers/message/messag-content/ui";

export default function MessagePage() {
	return (
		<MessageContainer>
			<MessageHeader/>
			<MessageContent/>
			<MessageSendBar/>
		</MessageContainer>
	);
}

const MessageContainer = styled.section`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`