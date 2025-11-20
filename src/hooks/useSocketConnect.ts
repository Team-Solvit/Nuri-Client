"use client";

import { useEffect, useRef, useCallback } from "react";
import { client } from "@/lib/socketClient";
import { useUserStore } from "@/store/user";
import { useMessageReflectStore } from "@/store/messageReflect";
import { ChatMessageResponse } from "@/containers/message/message-content/type";
import { useMessageAlertStore } from "@/store/messageAlert";
import { useAlertStore } from "@/store/alert";
import { useMessageConnectStore } from "@/store/messageConnect";
import { useMessageHeaderStore } from "@/store/messageHeader";
import { useQuery } from "@apollo/client";
import { MessageQueries } from "@/services/message";

export default function useSocketConnect() {
	const { userId, token: accessToken, clear } = useUserStore();
	const { setMessage } = useMessageReflectStore();
	const { fadeIn } = useMessageAlertStore();
	const { error } = useAlertStore();
	const { addSubscription, removeSubscription, clearSubscriptions } = useMessageConnectStore();
	const { roomId } = useMessageHeaderStore();
	const isConnecting = useRef(false);
	const hasInitialized = useRef(false);
	const previousRoomId = useRef<string | null>(null);

	const { refetch: refetchMessageCount } = useQuery<{ getNewMessageCount: number }>(
		MessageQueries.GET_NEW_MESSAGE_COUNT,
		{
			fetchPolicy: "no-cache",
			nextFetchPolicy: "no-cache",
			skip: !userId,
		}
	);

	// ref로 최신값 유지
	const refetchRef = useRef(refetchMessageCount);
	const roomIdRef = useRef(roomId);
	
	useEffect(() => {
		refetchRef.current = refetchMessageCount;
		roomIdRef.current = roomId;
	}, [refetchMessageCount, roomId]);

	const updateMessageCount = useCallback(async () => {
		if (refetchRef.current) {
			try {
				await refetchRef.current();
			} catch (e) {
				console.error("Failed to refetch message count:", e);
			}
		}
	}, []);

	// WebSocket 초기 연결 (userId, accessToken이 바뀔 때만)
	useEffect(() => {
		if (!userId || !accessToken) {
			console.log('⚠️ No userId or accessToken');
			return;
		}
		if (typeof window === 'undefined') return;
		
		if (hasInitialized.current) {
			console.log('✅ Already initialized, skipping');
			return;
		}
		
		if (isConnecting.current) {
			console.log('🔵 Already connecting, skipping');
			return;
		}
		
		if (client.active && client.connected) {
			console.log('✅ Already connected, skipping');
			hasInitialized.current = true;
			return;
		}

		console.log('🔄 Starting connection process...');
		isConnecting.current = true;
		hasInitialized.current = true;
		
		client.connectHeaders = {
			Authorization: `Bearer ${accessToken}`,
		};

		client.onConnect = () => {
			console.log('✅ STOMP Connected successfully');
			isConnecting.current = false;
			
			// 기존 구독이 있으면 클리어
			clearSubscriptions();

			// 개인 메시지 구독
			addSubscription(
				"user-message", 
				client.subscribe(`/user/${userId}/messages`, async (message) => {
					const messageData: ChatMessageResponse = JSON.parse(message.body);
					console.log("📩 Received message:", messageData);
					
					fadeIn(
						messageData?.sender?.profile,
						messageData?.roomId,
						messageData.sender.name,
						messageData.contents,
						messageData.sendAt
					);
					setMessage(messageData);
					await updateMessageCount();
				})
			);

			// 알림 구독
			addSubscription(
				"user-notify", 
				client.subscribe(`/user/${userId}/notify`, (message) => {
					console.log("🔔 Notify:", message.body);
					console.log("roomIdRef:", roomIdRef.current, roomId);
					try {
						const subMessage = message.body.split(" ");
						
						if (subMessage.length === 2 && subMessage[0] === "JOINPLAYERS") {
							const joinMessage: ChatMessageResponse = {
								name: "",
								picture: "",
								replyChat: { chatId: "", contents: "", name: "" },
								id: Date.now().toString(),
								roomId: roomIdRef.current, // ref 사용
								contents: `${subMessage[1]} join`,
								sender: { name: "nuri", profile: "" },
								sendAt: new Date().toISOString()
							};
							setMessage(joinMessage);
							return;
						}
						
						// EXITPLAYERS 처리 (2개 파라미터)
						if (subMessage.length === 2 && subMessage[0] === "EXITPLAYERS") {
							const exitedUser = subMessage[1];
							if (exitedUser === userId) {
								error("방장에 의해 추방당하였습니다");
								if (typeof window !== 'undefined') {
									window.location.href = '/message';
								}
								return;
							}
							
							const exitMessage: ChatMessageResponse = {
								name: "",
								picture: "",
								replyChat: { chatId: "", contents: "", name: "" },
								id: Date.now().toString(),
								roomId: roomIdRef.current as string, // ref 사용
								contents: `${exitedUser} exit`,
								sender: { name: "nuri", profile: "" },
								sendAt: new Date().toISOString()
							};
							setMessage(exitMessage);
							return;
						}
						console.log("알림왔어요 퇴장", subMessage);
						// EXITPLAYER 처리 (3개 파라미터: EXITPLAYER userName roomId)
						if (subMessage[0] === "EXITPLAYER") {
							const exitedUser = subMessage[1];

							if (exitedUser === userId) {
								error("방장에 의해 추방당하였습니다");
								if (typeof window !== 'undefined') {
									window.location.href = '/message';
								}
								return;
							}
							
							const exitMessage: ChatMessageResponse = {
								name: "",
								picture: "",
								replyChat: { chatId: "", contents: "", name: "" },
								id: Date.now().toString(),
								roomId: roomIdRef.current,
								contents: `${exitedUser} exit`,
								sender: { name: "nuri", profile: "" },
								sendAt: new Date().toISOString()
							};
							console.log("EXITPLAYER : 데이터에요", exitMessage);
							setMessage(exitMessage);
							return;
						}

						if (subMessage.length === 2 && subMessage[0] === "UNSUB") {
							console.log("🔕 Unsubscribing from:", subMessage[1]);
							removeSubscription(subMessage[1]);
						}
						
						if (subMessage.length === 2 && subMessage[0] === "SUB") {
							console.log("🔔 Subscribing to:", subMessage[1]);
							addSubscription(
								subMessage[1], 
								client.subscribe(`/chat/messages/${subMessage[1]}`, async (msg) => {
									const msgData = JSON.parse(msg.body);
									console.log("💬 Room:", subMessage[1], "Message:", msgData);
									setMessage(msgData);
									fadeIn(
										msgData.sender?.profile,
										msgData?.roomId,
										msgData.sender.name,
										msgData.contents,
										msgData.sendAt
									);
									await updateMessageCount();
								})
							);
						}
					} catch (err) {
						console.error("Notify parsing error:", err);
					}
				})
			);

			// 예외 처리 구독
			addSubscription(
				"user-exceptions", 
				client.subscribe(`/user/${userId}/exceptions`, () => {
					error("중복 로그인이 감지되어 기존 세션은 로그아웃 처리 됩니다.");
					clear();
					localStorage.removeItem("AT");
					localStorage.removeItem("nuri-user");
					clearSubscriptions();
					client.deactivate();
					hasInitialized.current = false;
				})
			);
		};

		client.onDisconnect = () => {
			console.log('🔴 STOMP Disconnected');
			console.trace('Disconnect stack trace');
			isConnecting.current = false;
		};

		client.onStompError = (frame) => {
			console.error('❌ STOMP Error:', frame);
			isConnecting.current = false;
		};

		client.onWebSocketClose = (event) => {
			console.log('🔴 WebSocket Closed:', event);
			isConnecting.current = false;
		};

		if (!client.active) {
			console.log('🟢 Activating STOMP client');
			try {
				client.activate();
			} catch (error) {
				console.error('❌ Failed to activate:', error);
				isConnecting.current = false;
				hasInitialized.current = false;
			}
		} else {
			console.log('⚠️ Client already active');
			isConnecting.current = false;
		}

		return () => {
			console.log('🧹 useSocketConnect cleanup');
		};
	}, [userId, accessToken]); // ⭐ roomId 제외!

	// roomId가 변경될 때만 실행되는 별도 effect
	useEffect(() => {
		if (!roomId || !client.connected) {
			return;
		}

		// 같은 roomId면 스킵
		if (previousRoomId.current === roomId) {
			return;
		}

		console.log(`🔄 RoomId changed: ${previousRoomId.current} → ${roomId}`);
		
		// 이전 roomId 구독 해제
		if (previousRoomId.current) {
			console.log(`🔕 Unsubscribing from previous room: ${previousRoomId.current}`);
			removeSubscription(previousRoomId.current);
		}

		// 새 roomId 구독
		console.log(`🔔 Subscribing to new room: ${roomId}`);
		addSubscription(
			roomId,
			client.subscribe(`/chat/messages/${roomId}`, async (msg) => {
				const msgData = JSON.parse(msg.body);
				console.log("💬 Current Room Message:", msgData);
				setMessage(msgData);
				fadeIn(
					msgData.sender?.profile,
					msgData?.roomId,
					msgData.sender.name,
					msgData.contents,
					msgData.sendAt
				);
				await updateMessageCount();
			})
		);

		previousRoomId.current = roomId;

	}, [roomId]); // ⭐ roomId만 의존성으로!

	// 페이지 완전 언마운트 시 정리
	useEffect(() => {
		if (typeof window === 'undefined') return;
		
		const handleBeforeUnload = () => {
			console.log('🧹 Page unload - disconnecting');
			if (client.active) {
				client.deactivate();
			}
			hasInitialized.current = false;
		};
		
		window.addEventListener('beforeunload', handleBeforeUnload);
		
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);
}