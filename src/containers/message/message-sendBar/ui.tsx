"use client"

import * as S from "./style"
import Send from "@/assets/icon/sent.svg"
import Image from "next/image"
import Plus from "@/assets/icon/plus.svg"
import React, {useEffect, useRef, useState} from "react";
import {sendDmChatMessage, sendGroupChatMessage} from "@/lib/socketClient";
import {useParams} from "next/navigation";
import {useAlertStore} from "@/store/alert";
import {useFileUpload} from "@/hooks/useFileUpload";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useMessageReplyStore} from "@/store/messageReply";
import {useMessageHeaderStore} from "@/store/messageHeader";
import {imageCheck} from "@/utils/imageCheck";

export default function MessageSendBar() {
	const {id} = useParams();
	const [message, setMessage] = useState("")
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isComposing, setIsComposing] = useState(false);
	
	const {error} = useAlertStore();
	const {upload, result, loading} = useFileUpload()
	useLoadingEffect(loading)
	// 이미지 전송 관련
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		
		// 유효하지 않은 파일 필터링
		const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type));
		if (invalidFiles.length > 0) {
			error('이미지 파일은 jpg, jpeg, png 형식만 업로드할 수 있습니다.');
			return;
		}
		const imageFiles = Array.from(files).filter(file => allowedTypes.includes(file.type));
		if (imageFiles.length === 0) return;
		
		await upload(imageFiles);
	};
	
	useEffect(() => {
		imageSend()
	}, [result]);
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
	
	const imageSend = () => {
		if (!result || result.length === 0) return;
		const type = checkType(id as string);
		if (Array.isArray(type)) {
			sendDmChatMessage(type, imageCheck(result[0]), chatRoomName, reply);
		} else if (type === "UUID 형식") {
			sendGroupChatMessage(id as string, imageCheck(result[0]), reply);
		} else {
			error("메시지 전송실패")
		}
		clearReply();
	}
	
	const {chatRoomName} = useMessageHeaderStore()
	// 메시지 전송 버튼
	
	const {reply, clearReply} = useMessageReplyStore()
	const handleSendMessage = () => {
		if (!message.trim() || isSending) return;
		setIsSending(true)
		const type = checkType(id as string);
		if (Array.isArray(type)) {
			sendDmChatMessage(type, message,chatRoomName, reply);
		} else if (type === "UUID 형식") {
			sendGroupChatMessage(id as string, message, reply);
		} else {
			error("메시지 전송실패")
		}
		clearReply();
		setMessage("");
		setIsSending(false)
	};
	
	
	// 엔터 시 메시지 전송
	const [isSending, setIsSending] = useState(false);
	const handleKeyDownSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (isComposing) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!message.trim() || isSending) return;
			setIsSending(true);
			try{
				const type = checkType(id as string);
				if (Array.isArray(type)) {
					await sendDmChatMessage(type, message, chatRoomName, reply);
				} else if (type === "UUID 형식") {
					await sendGroupChatMessage(id as string, message, reply);
				} else {
					error("메시지 전송에 실패")
				}
				setMessage("");
				clearReply();
			}finally {
				setIsSending(false);
			}
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
			<S.SendButton onClick={handleSendMessage} disabled={isSending}>
				<Image src={Send} alt={"send-icon"} fill/>
			</S.SendButton>
		</S.MessageSendBarContainer>
	)
}
