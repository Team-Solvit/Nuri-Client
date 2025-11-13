"use client";

import { useEffect } from "react";
import { client } from "@/lib/socketClient";
import { useUserStore } from "@/store/user";
import { useMessageReflectStore } from "@/store/messageReflect";
import { ChatMessageResponse } from "@/containers/message/message-content/type";
import { useMessageAlertStore } from "@/store/messageAlert";
import { useAlertStore } from "@/store/alert";
import { useMessageConnectStore } from "@/store/messageConnect";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { MessageQueries } from "@/services/message";

export default function useSocketConnect() {
	const { userId, token: accessToken, clear } = useUserStore();
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	const { error } = useAlertStore();
	const { addSubscription, removeSubscription, clearSubscriptions } = useMessageConnectStore();
	const { id: roomId } = useParams();

	// 메시지 카운트 쿼리 추가
	const { refetch: refetchMessageCount } = useQuery<{ getNewMessageCount: number }>(
		MessageQueries.GET_NEW_MESSAGE_COUNT,
		{
			fetchPolicy: "no-cache",
			nextFetchPolicy: "no-cache",
			skip: !userId,
		}
	);

	useEffect(() => {
		if (!userId || !accessToken) return;
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};

		client.onConnect = () => {
			addSubscription("user-message", client.subscribe(`/user/${userId}/messages`, (message) => {
				const messageData: ChatMessageResponse = JSON.parse(message.body);
				console.log("Received message:", messageData);
				fadeIn(
					messageData?.sender?.profile,
					messageData?.roomId,
					messageData.sender.name,
					messageData.contents,
					messageData.sendAt
				);
				setMessage(messageData);
				
				// 메시지 알림이 올 때마다 메시지 카운트 재요청
				if (refetchMessageCount) {
					try {
						refetchMessageCount();
					} catch (e) {
						console.error("Failed to refetch message count:", e);
					}
				}
			}))

			addSubscription("user-notify", client.subscribe(`/user/${userId}/notify`, (message) => {
				try {
					const subMessage = message.body.split(" ");
					if (subMessage.length === 2 && subMessage[0] === "JOINPLAYERS") {
						const joinMessage: ChatMessageResponse = {
							name: "",
							picture: "",
							replyChat: {
								chatId: "",
								contents: "",
								name: ""
							},
							id: Date.now().toString(),
							roomId: roomId as string,
							contents: `${subMessage[1]} join`,
							sender: {
								name: "nuri",
								profile: ""
							},
							sendAt: new Date().toISOString()
						};
						setMessage(joinMessage);
						return;
					}
					if (subMessage.length === 2 && subMessage[0] === "EXITPLAYERS") {
						const exitMessage: ChatMessageResponse = {
							name: "",
							picture: "",
							replyChat: {
								chatId: "",
								contents: "",
								name: ""
							},
							id: Date.now().toString(),
							roomId: roomId as string,
							contents: `${subMessage[1]} exit`,
							sender: {
								name: "nuri",
								profile: ""
							},
							sendAt: new Date().toISOString()
						};
						setMessage(exitMessage);
						return;
					}

					if (subMessage.length === 2 && subMessage[0] === "UNSUB") {
						removeSubscription(subMessage[1]);
					}
					if (subMessage.length === 2 && subMessage[0] === "SUB") {
						addSubscription(subMessage[1], client.subscribe(`/chat/messages/${subMessage[1]}`, (msg) => {
							const msgData = JSON.parse(msg.body);
							setMessage(msgData);
							fadeIn(
								msgData.sender?.profile,
								msgData?.roomId,
								msgData.sender.name,
								msgData.contents,
								msgData.sendAt
							);
							
							// 채팅방 메시지가 올 때마다 메시지 카운트 재요청
							if (refetchMessageCount) {
								try {
									refetchMessageCount();
								} catch (e) {
									console.error("Failed to refetch message count:", e);
								}
							}
						}))
					}
				} catch {
				}
			}));

			addSubscription("user-exceptions", client.subscribe(`/user/${userId}/exceptions`, () => {
				error("중복 로그인이 감지되어 기존 세션은 로그아웃 처리 됩니다.");
				clear();
				localStorage.removeItem("AT");
				localStorage.removeItem("nuri-user");
				clearSubscriptions();
				client.deactivate();
			}));

		};
		client.activate();
		return () => {
			clearSubscriptions();
			client.deactivate();
		};
	}, [userId, accessToken, refetchMessageCount]);
}