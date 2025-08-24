"use client"

import {useEffect} from "react";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {useUserStore} from "@/store/user";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/socket";

export default function useSocketConnect() {
	const {id, accessToken} = useUserStore();
	const isLoggedIn = typeof accessToken === "string" || false;
	
	const {data} = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn
	});
	
	useEffect(() => {
		if (!id || !accessToken) return;
		
		const client = new Client({
			webSocketFactory: () => new SockJS(socketUrl),
			connectHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
			reconnectDelay: 0,
			onConnect: (frame) => {
				console.log("연결 성공!", frame);
				
				client.subscribe(`/user/${id}/messages`, (message) => {
					const chat = JSON.parse(message.body);
					console.log("💬 새 메시지:", chat);
				});
				
				client.subscribe(`/user/${id}/exceptions`, (message) => {
					alert(message.body);
					client.deactivate();
				});
				
				client.subscribe(`/user/${id}/notify`, (message) => {
					const chat = JSON.parse(message.body);
					console.log("💬 새 메시지:", chat);
				});
				
				data?.getRoomsGroupChat?.content?.forEach((room) => {
					const roomId = room.roomDto?.id ?? null;
					if (!roomId) return;
					
					client.subscribe(`/messages/${roomId}`, (message) => {
						const chat = JSON.parse(message.body);
						console.log('💬 새 메시지:', chat);
					});
				});
			},
			onStompError: (frame) => {
				console.error("STOMP 오류:", frame);
			},
		});
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [id, accessToken]);
}