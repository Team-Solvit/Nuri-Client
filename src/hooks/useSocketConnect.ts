"use client";

import { useEffect } from "react";
import { client } from "@/lib/socketClient";
import { useUserStore } from "@/store/user";
import { useMessageReflectStore } from "@/store/messageReflect";
import { ChatMessageResponse } from "@/containers/message/message-content/type";
import { useMessageAlertStore } from "@/store/messageAlert";
import { useAlertStore } from "@/store/alert";
import {useMessageConnectStore} from "@/store/messageConnect";

export default function useSocketConnect() {
	const { userId, token: accessToken, clear } = useUserStore();
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	const { success, error } = useAlertStore();
	const { addSubscription, removeSubscription, clearSubscriptions} = useMessageConnectStore();
	
	useEffect(() => {
		if (!userId || !accessToken) return;
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};
		
		client.onConnect = () => {
			success("✅ 연결완료");
			
			addSubscription("user-message", client.subscribe(`/user/${userId}/messages`, (message) => {
				const messageData: ChatMessageResponse = JSON.parse(message.body);
				console.log("ddd",messageData)
				fadeIn(
					"https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e",
					messageData.userId,
					messageData.contents,
					messageData.sendAt
				);
				setMessage(messageData);
			}))
			
			addSubscription("user-notify", client.subscribe(`/user/${userId}/notify`, (message) => {
				try {
					const subMessage = message.body.split(" ");
					if (subMessage.length === 2 && subMessage[0] === "UNSUB") {
						console.log("UNSUB", subMessage[1]);
						removeSubscription(subMessage[1]);
					}
					if (subMessage.length === 2 && subMessage[0] === "SUB") {
						console.log("SUB", subMessage[1]);
						addSubscription(subMessage[1], client.subscribe(`/messages/${subMessage[1]}`, (msg) => {
							const msgData = JSON.parse(msg.body);
							setMessage(msgData);
							fadeIn(
								"https://storage.googleapis.com/ploytechcourse-version3/391b0b82-c522-4fd5-9a75-5a1488c21b7e",
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
			}));
			
		};
		client.activate();
		
		return () => {
			clearSubscriptions();
			client.deactivate();
		};
	}, [userId, accessToken]);
}