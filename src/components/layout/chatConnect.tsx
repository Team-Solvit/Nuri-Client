"use client";

import useSocketConnect from "@/hooks/useSocketConnect";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { MessageQueries } from "@/services/message";
import { useUserStore } from "@/store/user";
import { client } from "@/lib/socketClient";
import { useMessageConnectStore } from "@/store/messageConnect";
import { useMessageReflectStore } from "@/store/messageReflect";
import { useMessageAlertStore } from "@/store/messageAlert";

export default function ChatConnect() {
	const { token } = useUserStore();
	const { addSubscription, subscriptions } = useMessageConnectStore();
	const isLoggedIn = Boolean(token);
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();

	const { data } = useQuery(MessageQueries.GET_CONNECT_MESSAGES_LIST, {
		skip: !isLoggedIn,
		variables: {
			isGroup: isLoggedIn,
		},
		fetchPolicy: "network-only",
	});

	// useSocketConnect에서 이미 연결을 처리하므로 여기서는 호출만
	useSocketConnect();

	const connectRooms = () => {
		// 연결되지 않았으면 대기
		if (!client.connected) {
			console.log('⏳ Waiting for connection...');
			return;
		}

		data?.getRoomsGroupChat?.forEach((room: string) => {
			if (!room) return;
			
			// 이미 구독 중이면 스킵
			if (subscriptions[room]) {
				console.log('✅ Already subscribed to:', room);
				return;
			}

			console.log('🔔 Subscribing to room:', room);
			addSubscription(
				room, 
				client.subscribe(`/chat/messages/${room}`, async (message) => {
					const messageData = JSON.parse(message.body);
					console.log('💬 Room message:', room, messageData);
					setMessage(messageData);
					fadeIn(
						messageData.sender?.profile,
						messageData.roomId,
						messageData.sender.name,
						messageData.contents,
						messageData.sendAt
					);
				})
			);
		});
	};

	useEffect(() => {
		if (!data?.getRoomsGroupChat) return;
		
		// 연결될 때까지 대기 후 구독
		const subscribeWhenConnected = () => {
			if (client.connected) {
				connectRooms();
			} else {
				console.log('⏳ Not connected yet, waiting...');
				const timer = setTimeout(subscribeWhenConnected, 500);
				return () => clearTimeout(timer);
			}
		};

		subscribeWhenConnected();
	}, [data?.getRoomsGroupChat, client.connected]);

	return null;
}