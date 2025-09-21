"use client";

import useSocketConnect from "@/hooks/useSocketConnect";
import {useEffect} from "react";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useUserStore} from "@/store/user";
import {client} from "@/lib/soketClient";

export default function ChatConnect() {
	const {token} = useUserStore();
	const isLoggedIn = typeof token === "string" || false;
	
	const { data } = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn,
		variables: {
			isGroup: isLoggedIn,
		}
	});
	// const connectRooms = () => {
	// 	data?.getRoomsGroupChat?.content?.forEach((room) => {
	// 		console.log("messageData : ", room);
	// 		const roomId = room.roomDto?.id;
	// 		if (!roomId) return;
	//
	// 		subscriptions[roomId] = client.subscribe(`/messages/${roomId}`, (message) => {
	// 			const messageData = JSON.parse(message.body);
	// 			setMessage(messageData);
	// 			fadeIn(
	// 				"https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e",
	// 				messageData.userId,
	// 				messageData.contents,
	// 				messageData.sendAt
	// 			);
	// 			console.log("messageData2 : ", messageData);
	// 		});
	// 	});
	// }
	useSocketConnect();
	useEffect(() => {
		if(data?.getRoomsGroupChat){
		
		}
	}, [data?.getRoomsGroupChat]);
	return null;
}