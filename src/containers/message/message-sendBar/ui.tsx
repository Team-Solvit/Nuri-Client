"use client"

import * as S from "./style"
import Send from "@/assets/icon/sent.svg"
import Image from "next/image"
import Plus from "@/assets/icon/plus.svg"
import {useState} from "react";

export default function MessageSendBar() {
	const [message, setMessage] = useState("")
	return (
		<S.MessageSendBarContainer>
			<S.ContentBox>
				<S.AddFile>
					<Image src={Plus} alt={"send-icon"} fill/>
				</S.AddFile>
				<S.InputText
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="메시지를 입력하세요"
				/>
			</S.ContentBox>
			<S.SendButton>
				<Image src={Send} alt={"send-icon"} fill/>
			</S.SendButton>
		</S.MessageSendBarContainer>
	)
}