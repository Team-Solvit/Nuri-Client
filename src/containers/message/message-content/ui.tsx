
"use client"

import * as S from "./style"
import Image from "next/image"
import React, {useEffect, useRef, useState} from "react";
import Reply from "@/assets/icon/reply.svg"
import Plus from "@/assets/icon/plus.svg";
import ContractModal from "@/containers/message/contract-modal/ui"
import RoomTourModal from "@/containers/message/roomtour-modal/ui"
import Square from '@/components/ui/button/square';
import {useModalStore} from "@/store/modal"
import {messageType, useMessageModalStore} from "@/store/messageModal"
import BasicMessage from "@/components/ui/message/BasicMessage";
import ReplyMessage from "@/components/ui/message/ReplyMessage";
import ImageMessage from "@/components/ui/message/ImageMessage";
import RoomTourMessage from "@/components/ui/message/RoomTourMessage";
import ContractMessage from "@/components/ui/message/ContractMessage";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import {MessageQueries} from "@/services/message";
import {useUserStore} from "@/store/user";
import {formatKoreanDateTime} from "@/utils/formatKoreanDateTime"
import type {ChatMessage, ChatReadMessageResponse} from "@/containers/message/message-content/type";
import {useMessageReflectStore} from "@/store/messageReflect";
import {scrollToBottom} from "@/utils/scrollToBottom";
import {useMessageReplyStore} from "@/store/messageReply";
import {imageCheck} from "@/utils/imageCheck";
import {messageRequestCheck} from "@/utils/messageRequestCheck";
import {Contract, RoomTour} from "@/types/message";

export default function MessageContent() {
	const {message: newMessageReflect} = useMessageReflectStore();
	const {id} = useParams();
	const [roomId, setRoomId] = useState<string | null>(null);
	
	useEffect(() => {
		if (!id) return;
		if (id === roomId) return;
		if (typeof id === "string" && !id.includes("%3A")) {
			setRoomId(id);
			return;
		}
		
		const newRoomId = decodeURIComponent(id as string);
		setRoomId(newRoomId);
	}, [id]);
	
	const { data } = useQuery(MessageQueries.READ_MESSAGES, {
		variables: { roomId: roomId as string },
		skip: !roomId,
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
	});
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	useEffect(() => {
		const newMessage = data?.readMessages.map((message: ChatReadMessageResponse) => {
			return {
				...message,
				createdAt: formatKoreanDateTime(message.createdAt)
			}
		})
		setMessages(newMessage);
	}, [data?.readMessages]);
	
	useEffect(() => {
		if (!newMessageReflect) return;
		console.log("새로 온 메시지 : ", newMessageReflect)
		if (newMessageReflect.roomId !== roomId) return;
		const newSetMessage: ChatMessage = {
			roomId: newMessageReflect.roomId,
			contents: newMessageReflect.contents,
			id: newMessageReflect.id,
			sender: {
				name: newMessageReflect.userId,
				profile: newMessageReflect.picture,
			},
			createdAt: formatKoreanDateTime(newMessageReflect.sendAt)
		};
		
		const newMessage = (newMessage: ChatMessage) => {
			setMessages(prev => {
				return [...(prev ?? []), newMessage];
			});
		};
		newMessage(newSetMessage)
	}, [newMessageReflect]);
	
	let lastDate: string | null = null;
	const containerRef = useRef<HTMLDivElement>(null);
	const {reply : replyInfo, setReply : setReplyInfo} = useMessageReplyStore()
	
	
	const {open} = useModalStore();
	const {
		isOpen,
		messageType,
		setMessageType,
		open: messageModalOpen,
		setMaster,
		unSetMaster,
		setContractData
	} = useMessageModalStore();
	
	
	const openContract = (messageType: messageType, isMaster: boolean, data ?: Contract | RoomTour) => {
		open();
		messageModalOpen();
		if (!data) return;
		setContractData(data);
		setMessageType(messageType);
		if (isMaster) setMaster();
		else unSetMaster();
	};
	
	const {userId} = useUserStore();
	// 접속 시 맨 밑으로 스크롤
	useEffect(() => {
		const handleResize = () => scrollToBottom(containerRef.current);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	useEffect(() => {
		scrollToBottom(containerRef.current);
	}, [messages]);
	return (
		<S.ContainerBox>
			{ messageType === "contract" && isOpen && <ContractModal/>}
			{ messageType === "roomtour" && isOpen && <RoomTourModal/>}
			
			{replyInfo && (
				<S.ReplyPreviewContainer>
					<div style={{flex: 1}}>
						<S.ReplyPreviewName>{replyInfo.name}님에게 답장</S.ReplyPreviewName>
						<S.ReplyPreviewText>{replyInfo.contents}</S.ReplyPreviewText>
					</div>
					<S.ReplyPreviewCloseBtn onClick={() => setReplyInfo(null)}>
						<Image style={{transform: 'rotate(45deg)'}} src={Plus} width={24} height={24} alt="close reply"/>
					</S.ReplyPreviewCloseBtn>
				</S.ReplyPreviewContainer>
			)}
			
			<S.MessageContentContainer ref={containerRef}>
				{messages && messages.map((msg, idx) => {
					const nextUser = idx < messages.length && messages[idx + 1]?.sender.name
					const showDate = msg.createdAt.date && msg.createdAt.date !== lastDate;
					lastDate = msg.createdAt.date || lastDate;
					const isLastOfTime =
						idx === messages.length - 1 ||
						messages[idx + 1].createdAt.time !== msg.createdAt.time ||
						messages[idx + 1].sender.name !== msg.sender.name;
					
					const isFirstOfTime =
						idx === 0 ||
						messages[idx - 1].createdAt.date !== msg.createdAt.date ||
						messages[idx - 1].sender.name !== msg.sender.name;
					
					const renderMessageBody = () => {
						const request = messageRequestCheck(msg.contents)
						if (request && request.type === "contract") {
							return (
								<ContractMessage
									contract = {request}
									time={isLastOfTime ? msg.createdAt.time : undefined}
									isSent={msg.sender.name === userId}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract("contract", msg.sender.name !== userId || request.status === "ACTIVE", request)}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						if (request && request.type === "roomTour") {
							return (
								<RoomTourMessage
									roomTour = {request}
									messageTime={isLastOfTime ? msg.createdAt.time : undefined}
									isSent={msg.sender.name === userId}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract("roomtour", msg.sender.name !== userId, request)}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						const regex = /^https:\/\/cdn\.solvit-nuri\.com\/file\/[0-9a-fA-F-]{36}$/;
						// 이미지 형식
						if (regex.test(msg.contents)) {
							return <ImageMessage src={msg.contents} alt="img-msg" time={isLastOfTime ? msg.createdAt.time : undefined}
							                     isSent={msg.sender.name === userId}/>;
						}
						// 답장형식
						return (
							<>
								{msg.replyChat && (
									<ReplyMessage
										type={msg.sender.name === userId ? "sent" : "received"}
										name={msg.replyChat.name || ""}
										text={msg.replyChat.contents || ""}
										icon={<Image src={Reply} width={20} height={20} alt="reply"/>}
										time={isLastOfTime ? msg.createdAt.time : undefined}
									/>
								)}
								<BasicMessage text={msg.contents}
								              time={isLastOfTime ? msg.createdAt.time : undefined}
								              isSent={msg.sender.name === userId}/>
							</>
						);
					};
					const regex = /^https:\/\/cdn\.solvit-nuri\.com\/file\/[0-9a-fA-F-]{36}$/;
					const request = messageRequestCheck(msg.contents)
					const isValid = request?.type !== "roomTour" && request?.type !== "contract" && !regex?.test(msg.contents);
					return (
						<div key={msg.id}>
							{showDate && <S.DateDivider>{msg.createdAt.date} {msg.createdAt.time}</S.DateDivider>}
							
							{msg.sender.name !== userId ? (
								<S.ReceivedMsgRow isSameUser={nextUser !== msg.sender.name}>
									{isFirstOfTime ? (
										<div style={{position: "relative"}}>
											<S.ProfileName>{msg.sender.name}</S.ProfileName>
											<S.ProfileImg isFirst={true}>
												<Image src={imageCheck(msg.sender.profile  || "")} fill alt={msg.sender.name || 'profile'}/>
											</S.ProfileImg>
										</div>
									) : (
										<S.ProfileImg isFirst={false}/>
									)}
									<S.ReceivedMsgAndTimeWrapper isHaveReply={!!msg.replyChat?.contents}>
										{renderMessageBody()}
										{isValid && (
											<S.MsgHoverIcons className="msg-hover-icons"
											                 style={{cursor: 'pointer'}}
											                 onClick={() => setReplyInfo({chatId : msg.id ,name: msg.sender.name || '', contents: msg.contents})}
											>
												<Image
													style={{cursor: 'pointer'}}
													src={Reply}
													width={20}
													height={20}
													alt="reply"
												/>
											</S.MsgHoverIcons>
										)}
									</S.ReceivedMsgAndTimeWrapper>
								</S.ReceivedMsgRow>
							) : (
								<S.SentMsgRow isSameUser={nextUser !== msg.sender.name}>
									<S.SentMsgAndTimeWrapper isHaveReply={!!msg.replyChat?.contents}>
										{renderMessageBody()}
									</S.SentMsgAndTimeWrapper>
								</S.SentMsgRow>
							)}
						</div>
					);
				})}
			</S.MessageContentContainer>
		</S.ContainerBox>
	);
}
