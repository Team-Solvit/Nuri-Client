"use client"

import * as S from "./style"
import Image from "next/image"
import Message from "@/assets/meeting/profile.png"

export default function MessageHeaderUI() {
	return (
		<S.MessageHeaderContainer className="message-header">
			<S.ProfileBox>
				<Image src={Message} alt="message" fill/>
			</S.ProfileBox>
			<p>huhon123</p>
		</S.MessageHeaderContainer>
	);
}