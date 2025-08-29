"use client";

import {useEffect} from "react";
import {client} from "@/lib/soketClient";
import {useUserStore} from "@/store/user";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useMessageReflectStore} from "@/store/messageReflect";
import {ChatMessageResponse} from "@/containers/message/message-content/type";
import {useMessageAlertStore} from "@/store/messageAlert";

export default function useSocketConnect() {
	const {id, accessToken} = useUserStore();
	const {setMessage} = useMessageReflectStore();
	const {
		fadeIn
	} = useMessageAlertStore();
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
			console.log("✅ 연결완료")
			client.subscribe(`/user/${id}/messages`, (message) => {
				const messageData: ChatMessageResponse = JSON.parse(message.body);
				fadeIn("https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e", messageData.userId, messageData.contents, messageData.sendAt)
				setMessage(messageData)
			});
			
			client.subscribe(`/user/${id}/notify`, (message) => {
				const messageData = JSON.parse(message.body);
				alert("notify 발동", messageData)
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
					setMessage(messageData)
					fadeIn("https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e", messageData.userId, messageData.contents, messageData.sendAt)
					console.log("messageData2 : ", messageData)
				});
			});
		};
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [id, accessToken, data]);
}