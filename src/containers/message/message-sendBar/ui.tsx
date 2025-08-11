"use client"

import * as S from "./style"
import Send from "@/assets/icon/sent.svg"
import Image from "next/image"
import Plus from "@/assets/icon/plus.svg"
import {useRef, useState} from "react";

export default function MessageSendBar() {
	const [message, setMessage] = useState("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith('image/')) {
				alert('이미지 파일만 업로드 가능합니다.');
				return;
			}
			
			console.log('Selected file:', file.name);
		}
	};
	
	const handleAddFileClick = () => {
		fileInputRef.current?.click();
	};
	
	return (
		<S.MessageSendBarContainer>
			<S.ContentBox>
				<S.AddFile onClick={handleAddFileClick}>
					<Image src={Plus} alt="파일 추가" fill/>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept="image/*"
						style={{display: 'none'}}
					/>
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