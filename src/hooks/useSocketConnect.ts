"use client";

import {useEffect} from "react";
import {client} from "@/lib/soketClient";
import {useUserStore} from "@/store/user";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useMessageReflectStore} from "@/store/messageReflect";

export default function useSocketConnect() {
	const {id, accessToken} = useUserStore();
	const {setMessage} = useMessageReflectStore();
	const isLoggedIn = typeof accessToken === "string" || false;
	
	const {data} = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn,
	});
	
	useEffect(() => {
		if (!id || !accessToken) return;
		
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};
		
		client.onConnect = () => {
			console.log("연결 성공!");
			
			client.subscribe(`/user/${id}/messages`, (message) => {
				const messageData = JSON.parse(message.body);
				console.log("새 메시지 ✅", messageData)
				setMessage(messageData)
			});
			
			client.subscribe(`/user/${id}/notify`, (message) => {
				const messageData = JSON.parse(message.body);
				console.log("새 메시지 ✅", messageData)
				setMessage(messageData)
			});
			
			client.subscribe(`/user/${id}/exceptions`, (message) => {
				const messageData = JSON.parse(message.body);
				alert("중복 로그인 감지", messageData)
			});
			data?.getRoomsGroupChat?.copntent?.forEach((room) => {
				const roomId = room.roomDto?.id;
				if (!roomId) return;
				client.subscribe(`/messages/${roomId}`, (message) => {
					const messageData = JSON.parse(message.body);
					console.log("새 메시지 ✅", messageData)
					setMessage(messageData)
				});
			});
		};
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [id, accessToken, data]);
}