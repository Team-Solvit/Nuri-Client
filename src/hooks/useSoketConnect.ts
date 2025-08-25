"use client";

import {useEffect} from "react";
import {client} from "@/lib/soketClient";
import {useUserStore} from "@/store/user";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";

export default function useSocketConnect() {
	const {id, accessToken} = useUserStore();
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
				console.log("💬 새 메시지:", JSON.parse(message.body));
			});
			
			data?.getRoomsGroupChat?.copntent?.forEach((room) => {
				const roomId = room.roomDto?.id;
				if (!roomId) return;
				client.subscribe(`/messages/${roomId}`, (message) => {
					console.log("💬 새 메시지:", JSON.parse(message.body));
				});
			});
		};
		
		client.activate();
		
		return () => {
			client.deactivate();
		};
	}, [id, accessToken, data]);
}