"use client"

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatRecordRequestDto, ReplyChatInput } from "@/types/message";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/socket";


export const client = new Client({
	webSocketFactory: () => new SockJS(socketUrl),
	reconnectDelay: 5000,
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

	client.publish({
		destination: `/messages/group`,
		body: JSON.stringify(payload),
	});
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
	client.publish({
		destination: `/messages/${userId}`,
		body: JSON.stringify(payload),
	});
};