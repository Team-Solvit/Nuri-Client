"use client";

import { useEffect } from "react";
import { client } from "@/lib/socketClient";
import { useUserStore } from "@/store/user";
import { useMessageReflectStore } from "@/store/messageReflect";
import {ChatMessageResponse} from "@/containers/message/message-content/type";
import { useMessageAlertStore } from "@/store/messageAlert";
import { useAlertStore } from "@/store/alert";
import {useMessageConnectStore} from "@/store/messageConnect";
import {useParams} from "next/navigation";

export default function useSocketConnect() {
	const { userId, token: accessToken, clear } = useUserStore();
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	const { error } = useAlertStore();
	const { addSubscription, removeSubscription, clearSubscriptions} = useMessageConnectStore();
	const {id : roomId} = useParams()
	
	useEffect(() => {
		if (!userId || !accessToken) return;
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};
		
		client.onConnect = () => {
			addSubscription("user-message", client.subscribe(`/user/${userId}/messages`, (message) => {
				const messageData: ChatMessageResponse = JSON.parse(message.body);
				fadeIn(
					messageData.sender?.profile ?? "/post/default.png",
					messageData.sender.name,
					messageData.contents,
					messageData.sendAt
				);
				setMessage(messageData);
			}))
			
			addSubscription("user-notify", client.subscribe(`/user/${userId}/notify`, (message) => {
				try {
					console.log(message.body)
					const subMessage = message.body.split(" ");
					if (subMessage.length === 2 && subMessage[0] === "JOINPLAYERS") {
						const joinMessage : ChatMessageResponse = {
							name: "",
							picture: "",
							replyChat: {
								chatId : "",
								contents : "",
								name : ""
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
						console.log("joinMessage : ", joinMessage)
						setMessage(joinMessage);
						return;
					}
					if (subMessage.length === 2 && subMessage[0] === "EXITPLAYERS") {
						const exitMessage : ChatMessageResponse = {
							name: "",
							picture: "",
							replyChat: {
								chatId : "",
								contents : "",
								name : ""
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
						console.log(subMessage, exitMessage)
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
								msgData.sender?.profile ?? "/post/default.png",
								msgData.userId,
								msgData.contents,
								msgData.sendAt
							);
						}))
					}
				} catch (e) {
					console.warn("Invalid UNSUB message:", message.body, e);
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
	}, [userId, accessToken]);
}