"use client"

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatRecordRequestDto, ReplyChatInput } from "@/types/message";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/socket";

// 로그아웃 처리 함수
const handleLogout = () => {
	if (typeof window !== 'undefined') {
		// 로컬 스토리지 클리어
		localStorage.removeItem('nuri-user');
		// 홈으로 리다이렉트
		window.location.href = '/';
	}
};

export const client = new Client({
	webSocketFactory: () => new SockJS(socketUrl),
	reconnectDelay: 5000,
	onStompError: (frame) => {
		console.error('STOMP error:', frame);
		// 인증 오류 시 로그아웃
		if (frame.headers?.message?.includes('Unauthorized') || 
			frame.headers?.message?.includes('token') ||
			frame.headers?.message?.includes('expired')) {
			handleLogout();
		}
	},
});

export const sendGroupChatMessage = (roomId: string, message: string, replyChat: ReplyChatInput | null) => {
	if (!client.active) {
		return;
	}
	if (!roomId || !message) return;
	const payload: ChatRecordRequestDto = {
		contents: message,
		roomId: roomId,
		replyChat: replyChat,
	};

	try {
		client.publish({
			destination: `/messages/group`,
			body: JSON.stringify(payload),
		});
	} catch (error) {
		console.error('Failed to publish group message:', error);
		// publish 실패 시 로그아웃
		handleLogout();
	}
};

export const sendDmChatMessage = (roomId: string[], message: string, userId: string, replyChat: ReplyChatInput | null) => {
	if (!client.active) {
		return;
	}
	if (!userId || !message || roomId.length < 2) {
		return;
	}
	const payload: ChatRecordRequestDto = {
		roomId: roomId[0] + ":" + roomId[1],
		contents: message,
		replyChat: replyChat,
	};
	try {
		client.publish({
			destination: `/messages/${userId}`,
			body: JSON.stringify(payload),
		});
	} catch (error) {
		console.error('Failed to publish DM message:', error);
		// publish 실패 시 로그아웃
		handleLogout();
	}
};