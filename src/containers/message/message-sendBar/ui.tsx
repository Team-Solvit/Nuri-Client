"use client"

import * as S from "./style"
import Send from "@/assets/icon/sent.svg"
import Image from "next/image"
import Plus from "@/assets/icon/plus.svg"
import React, {useRef, useState} from "react";
import {sendDmChatMessage, sendGroupChatMessage} from "@/lib/soketClient";
import {useParams} from "next/navigation";
import {useAlertStore} from "@/store/alert";

export default function MessageSendBar() {
	const {id} = useParams();
	const [message, setMessage] = useState("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isComposing, setIsComposing] = useState(false);
	
	// 이미지 전송 관련
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
	
	function checkType(str: string) {
		const decoded = decodeURIComponent(str);
		const userIdRegex = /^[a-zA-Z0-9_]+:[a-zA-Z0-9_]+$/;
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
		
		if (userIdRegex.test(decoded)) {
			return decoded.split(":");
		} else if (uuidRegex.test(decoded)) {
			return "UUID 형식";
		} else {
			return "알 수 없음";
		}
	}
	
	// 메시지 로딩표시
	// const {setLoading, isLoading} = useMessageReflectStore();
	// const setIsMessageLoading = (message: string) => {
	// 	const time = new Date();
	// 	const isoMillis = time.toISOString();
	// 	setLoading({
	// 		...isLoading,
	// 		[isoMillis + message]: {
	// 			status: true,
	// 			content: message,
	// 			createAt: isoMillis
	// 		},
	// 	});
	// }
	
	
	// 메시지 전송 버튼
	const {error} = useAlertStore();
	const handleSendMessage = () => {
		if (!message.trim()) return;
		const type = checkType(id as string);
		if (Array.isArray(type)) {
			sendDmChatMessage(type, message);
		} else if (type === "UUID 형식") {
			sendGroupChatMessage(id as string, message);
		} else {
			error("메시지 전송실패")
		}
		setMessage("");
	};
	
	// 엔터 시 메시지 전송
	const [isSending, setIsSending] = useState(false);
	const handleKeyDownSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (isComposing) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!message.trim() || isSending) return;
			setIsSending(true);
			const type = checkType(id as string);
			if (Array.isArray(type)) {
				await sendDmChatMessage(type, message);
			} else if (type === "UUID 형식") {
				await sendGroupChatMessage(id as string, message);
			} else {
				error("메시지 전송에 실패")
			}
			setMessage("");
			setIsSending(false);
		}
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