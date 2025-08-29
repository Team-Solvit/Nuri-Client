"use client"

import * as S from "./style"
import Profile from "@/assets/meeting/member-profile.png"
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

export default function MessageContent() {
	const {message: newMessageReflect} = useMessageReflectStore();
	const {id} = useParams();
	const {data} = useQuery(MessageQueries.READ_MESSAGES, {
		variables: {
			roomId: id,
		}
	})
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
		if (newMessageReflect.roomId !== id) return;
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
	const [replyInfo, setReplyInfo] = useState<null | { name: string, text: string }>(null);
	
	
	const {open} = useModalStore();
	const {
		setMessageType,
		open: messageModalOpen,
		setMaster,
		unSetMaster
	} = useMessageModalStore();
	
	
	const openContract = (messageType: messageType, isMaster: boolean) => {
		open();
		messageModalOpen();
		setMessageType(messageType);
		if (isMaster) setMaster();
		else unSetMaster();
	};
	
	const {id: userId} = useUserStore();
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
			<ContractModal/>
			<RoomTourModal/>
			
			{replyInfo && (
				<S.ReplyPreviewContainer>
					<div style={{flex: 1}}>
						<S.ReplyPreviewName>{replyInfo.name}님에게 답장</S.ReplyPreviewName>
						<S.ReplyPreviewText>{replyInfo.text}</S.ReplyPreviewText>
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
						if (msg.contents === "" && msg.contract) {
							return (
								<ContractMessage
									thumbnail={msg.contract.thumbnail || '/assets/meeting/profile.png'}
									name={msg.contract.name || ""}
									time={isLastOfTime ? msg.createdAt.time : undefined}
									isSent={msg.sender.name === userId}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract("contract", msg.sender.name !== userId)}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						if (msg.contents === "" && msg.roomTour) {
							return (
								<RoomTourMessage
									thumbnail={msg.roomTour.thumbnail || '/assets/meeting/profile.png'}
									name={msg.roomTour.name || ""}
									date={msg.roomTour.date || ""}
									tourTime={msg.roomTour.time || ""}
									messageTime={isLastOfTime ? msg.createdAt.time : undefined}
									isSent={msg.sender.name === userId}
									button={
										<Square
											text="자세히보기"
											onClick={() => openContract("roomtour", msg.sender.name !== userId)}
											status={true}
											width="100%"
										/>
									}
								/>
							);
						}
						
						// 이미지 형식
						// if (msg.contents === "" && msg.img) {
						// 	return <ImageMessage src={msg.img} alt="img-msg" time={isLastOfTime ? msg.time : undefined}
						// 	                     isSent={msg.type === 'sent'}/>;
						// }
						// 답장형식
						return (
							<>
								{/*{msg.replyChat && (*/}
								{/*	<ReplyMessage*/}
								{/*		type={msg.type}*/}
								{/*		name={msg.replyTo.name || ""}*/}
								{/*		text={msg.replyTo.text || ""}*/}
								{/*		icon={<Image src={Reply} width={20} height={20} alt="reply"/>}*/}
								{/*		time={isLastOfTime ? msg.time : undefined}*/}
								{/*	/>*/}
								{/*)}*/}
								<BasicMessage text={msg.contents}
								              time={isLastOfTime ? msg.createdAt.time : undefined}
								              isSent={msg.sender.name === userId}/>
							</>
						);
					};
					return (
						<div key={msg.id}>
							{showDate && <S.DateDivider>{msg.createdAt.date} {msg.createdAt.time}</S.DateDivider>}
							
							{msg.sender.name !== userId ? (
								<S.ReceivedMsgRow isSameUser={nextUser !== msg.sender.name}>
									{isFirstOfTime ? (
										<div style={{position: "relative"}}>
											<S.ProfileName>{msg.sender.name}</S.ProfileName>
											<S.ProfileImg isFirst={true}>
												{msg.sender.profile && <Image src={Profile} fill alt={msg.sender.name || 'profile'}/>}
											</S.ProfileImg>
										</div>
									) : (
										<S.ProfileImg isFirst={false}/>
									)}
									<S.ReceivedMsgAndTimeWrapper isHaveReply={msg.replyChat ?? false}>
										{renderMessageBody()}
										{!msg.contract && !msg.roomTour && !msg.img && (
											<S.MsgHoverIcons className="msg-hover-icons"
											                 onClick={() => setReplyInfo({name: msg.sender.name || '', text: msg.contents})}
											>
												<Image
													src={Reply}
													width={20}
													height={20}
													alt="reply"
													style={{cursor: 'pointer'}}
												/>
											</S.MsgHoverIcons>
										)}
									</S.ReceivedMsgAndTimeWrapper>
								</S.ReceivedMsgRow>
							) : (
								<S.SentMsgRow isSameUser={nextUser !== msg.sender.name}>
									<S.SentMsgAndTimeWrapper isHaveReply={msg.replyChat ?? false}>
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