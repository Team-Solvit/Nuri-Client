"use client"

import * as S from "./style"
import Send from "@/assets/icon/sent.svg"
import Image from "next/image"
import Plus from "@/assets/icon/plus.svg"
import React, {useRef, useState} from "react";
import {sendDmChatMessage, sendGroupChatMessage} from "@/lib/soketClient";
import {useParams} from "next/navigation";

export default function MessageSendBar() {
	const {id} = useParams();
	const [message, setMessage] = useState("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isComposing, setIsComposing] = useState(false);
	
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
	
	const [isSending, setIsSending] = useState(false);
	const handleKeyDownSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (isComposing) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!message.trim() || isSending) return;
			setIsSending(true);
			if (checkType(id as string)) {
				await sendDmChatMessage(id as string, message);
			} else {
				await sendGroupChatMessage(id as string, message);
			}
			setMessage("");
			setIsSending(false);
		}
	};
	
	function checkType(str: string) {
		const userIdRegex = /^[a-zA-Z0-9_]+:[a-zA-Z0-9_]+$/;
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		
		if (userIdRegex.test(str)) {
			return "userId 형식";
		} else if (uuidRegex.test(str)) {
			return "UUID 형식";
		} else {
			return "알 수 없음";
		}
	}
	
	const handleSendMessage = () => {
		if (!message.trim()) return;
		if (checkType(id as string) === "userId 형식") {
			sendDmChatMessage(id as string, message);
		} else {
			sendGroupChatMessage(id as string, message);
		}
		setMessage("");
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
					onCompositionStart={() => setIsComposing(true)}
					onCompositionEnd={() => setIsComposing(false)}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={async (e) => {
						await handleKeyDownSendMessage(e)
					}}
					placeholder="메시지를 입력하세요 (Shift+Enter로 줄바꿈)"
				/>
			</S.ContentBox>
			<S.SendButton onClick={handleSendMessage}>
				<Image src={Send} alt={"send-icon"} fill/>
			</S.SendButton>
		</S.MessageSendBarContainer>
	)
}