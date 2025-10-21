"use client";

import useSocketConnect from "@/hooks/useSocketConnect";
import {useEffect} from "react";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useUserStore} from "@/store/user";
import {client} from "@/lib/socketClient";
import {useMessageConnectStore} from "@/store/messageConnect";
import {useMessageReflectStore} from "@/store/messageReflect";
import {useMessageAlertStore} from "@/store/messageAlert";

export default function ChatConnect() {
	const {token} = useUserStore();
	const {addSubscription, subscriptions} = useMessageConnectStore();
	const isLoggedIn = typeof token === "string" || false;
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	
	const { data } = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn,
		variables: {
			isGroup: isLoggedIn,
		}
	});
	
	const connectRooms = () => {
		if (!client.connected) return;
		data?.getRoomsGroupChat?.forEach((room : string) => {
			if (!room) return;
			if (subscriptions[room]) return;
			
			addSubscription(room, client.subscribe(`/chat/messages/${room}`, (message) => {
				const messageData = JSON.parse(message.body);
				setMessage(messageData);
				fadeIn(
					"https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e",
					messageData.userId,
					messageData.contents,
					messageData.sendAt
				);
			}));
		});
	}
	
	useSocketConnect();
	
	useEffect(() => {
		if(data?.getRoomsGroupChat){
			connectRooms();
		}
	}, [data?.getRoomsGroupChat, client.connected]);
	
	return null;
}