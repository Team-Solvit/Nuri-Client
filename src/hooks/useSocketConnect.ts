"use client";

import {useEffect} from "react";
import {client} from "@/lib/soketClient";
import {useUserStore} from "@/store/user";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useMessageReflectStore} from "@/store/messageReflect";
import {ChatMessageResponse} from "@/containers/message/message-content/type";
import {useMessageAlertStore} from "@/store/messageAlert";
import {useAlertStore} from "@/store/alert";

export default function useSocketConnect() {
	const {userId, token : accessToken, clear} = useUserStore();
	const {setMessage} = useMessageReflectStore();
	const {
		fadeIn
	} = useMessageAlertStore();
	const isLoggedIn = typeof accessToken === "string" || false;
	
	const {data} = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn,
	});
	const {success, error} = useAlertStore()
	useEffect(() => {
		if (!userId || !accessToken) return;
		
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};
		
		client.onConnect = () => {
			console.log("✅ 연결완료")
			success("✅ 연결완료")
			client.subscribe(`/user/${userId}/messages`, (message) => {
				const messageData: ChatMessageResponse = JSON.parse(message.body);
				console.log("messageData : ", messageData)
				fadeIn("https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e", messageData.userId, messageData.contents, messageData.sendAt)
				setMessage(messageData)
			});
			
			client.subscribe(`/user/${userId}/notify`, (message) => {
				const messageData = JSON.parse(message.body);
				alert("notify 발동", messageData)
			});
			
			client.subscribe(`/user/${userId}/exceptions`, () => {
				error("중복 로그인이 감지되어 기존 세션은 로그아웃 처리 됩니다.")
				clear()
				localStorage.removeItem("AT")
				localStorage.removeItem("nuri-user")
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
	}, [userId, accessToken, data]);
}