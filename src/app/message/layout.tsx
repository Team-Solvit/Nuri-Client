"use client"

import styled from "@emotion/styled";
import SideBar from "@/containers/message/side-bar/ui"
import React from "react";
import {mq} from "@/styles/media";


export default function MessagePage({children}: { children: React.ReactNode }) {
	return (
		<MessageContainer>
			<SideBar/>
			{children}
		</MessageContainer>
	)
}

const MessageContainer = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;

  ${mq.mobile} {
    grid-template-columns: 1fr;
  }
`