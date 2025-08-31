"use client"

import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {ChatRecordRequestDto} from "@/types/message";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/socket";


export const client = new Client({
	webSocketFactory: () => new SockJS(socketUrl),
	reconnectDelay: 5000,
});


export const sendGroupChatMessage = (roomId: string, message: string) => {
	if (!client.active) {
		console.error("❌ 소켓 연결 안 됨");
		return;
	}
	if (!roomId || !message) return;
	const payload: ChatRecordRequestDto = {
		contents: message,
		roomId: roomId,
		replyChat: null,
	};
	
	client.publish({
		destination: `/chat/group`,
		body: JSON.stringify(payload),
	});
};

export const sendDmChatMessage = (userId: string[], message: string) => {
	if (!client.active) {
		console.error("❌ 소켓 연결 안 됨");
		return;
	}
	if (!userId || !message) return;
	const payload: ChatRecordRequestDto = {
		roomId: userId[0] + ":" + userId[1],
		contents: message,
		replyChat: null,
	};
	console.log("payload : ", payload)
	console.log(`/chat/${userId[0] + ":" + userId[1]}`)
	client.publish({
		destination: `/chat/${userId[0] + ":" + userId[1]}`,
		body: JSON.stringify(payload),
	});
};