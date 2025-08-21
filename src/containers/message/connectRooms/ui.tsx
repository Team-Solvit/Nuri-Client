"use client"

import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {soketClient} from "@/lib/soketClient";
import {useEffect} from "react";
import {useMessageRoomListConnectStore} from "@/store/messageRoomListConnect";

export default function ConnectRooms() {
	const {isOpen} = useMessageRoomListConnectStore();
	const token = typeof window !== "undefined" ? localStorage.getItem("AT") : null;
	const isLoggedIn = !!token;
	
	const {data} = useQuery(MessageQueries.GET_ROOMS_CHAT_LIST, {
		variables: {page: 1, size: 5},
		skip: !isLoggedIn
	});
	
	useEffect(() => {
		if (!data || isOpen) return;
		soketClient.activate();
		
		data.getRooms.content.forEach((room: any) => {
			const roomId = room.roomDto?.id ?? null;
			if (!roomId) return;
			
			soketClient.subscribe(`/messages/${roomId}`, (message) => {
				const chat = JSON.parse(message.body);
				console.log('💬 새 메시지:', chat);
			});
		});
	}, [data, isOpen]);
	
	return null;
}